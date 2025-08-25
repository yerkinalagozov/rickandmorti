package main

import (
	"encoding/json"
	"io"
	"log"
	"net/http"
	"net/url"
	"os"
	"time"

	"github.com/gorilla/mux"
)

func main() {
	addr := getEnv("ADDR", ":8080")
	api := newServer()

	srv := &http.Server{
		Addr:         addr,
		Handler:      api,
		ReadTimeout:  15 * time.Second,
		WriteTimeout: 15 * time.Second,
		IdleTimeout:  60 * time.Second,
	}

	log.Printf("Rick & Morty API proxy listening on %s", addr)
	if err := srv.ListenAndServe(); err != nil && err != http.ErrServerClosed {
		log.Fatal(err)
	}
}

func newServer() http.Handler {
	r := mux.NewRouter()
	r.Use(commonHeaders)

	r.HandleFunc("/api/v1/health", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		_ = json.NewEncoder(w).Encode(map[string]any{"status": "ok", "time": time.Now()})
	}).Methods(http.MethodGet)

	// Minimal proxy to Rick & Morty API for characters, episodes, locations
	r.HandleFunc("/api/v1/characters", handleCharactersList).Methods(http.MethodGet)
	r.HandleFunc("/api/v1/characters/{id:[0-9]+}", handleCharacterDetail).Methods(http.MethodGet)
	r.HandleFunc("/api/v1/episodes", handleEpisodesList).Methods(http.MethodGet)
	r.HandleFunc("/api/v1/locations", handleLocationsList).Methods(http.MethodGet)
	return r
}

func handleCharactersList(w http.ResponseWriter, r *http.Request) {
	proxyList(w, r, "https://rickandmortyapi.com/api/character", []string{"page", "name", "status", "species", "type", "gender"})
}

func handleCharacterDetail(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id := vars["id"]
	if id == "" {
		http.Error(w, "missing id", http.StatusBadRequest)
		return
	}
	proxyDetail(w, "https://rickandmortyapi.com/api/character/"+id)
}

func handleEpisodesList(w http.ResponseWriter, r *http.Request) {
	proxyList(w, r, "https://rickandmortyapi.com/api/episode", []string{"page", "name", "episode"})
}

func handleLocationsList(w http.ResponseWriter, r *http.Request) {
	proxyList(w, r, "https://rickandmortyapi.com/api/location", []string{"page", "name", "type", "dimension"})
}

func proxyList(w http.ResponseWriter, r *http.Request, baseURL string, passthrough []string) {
	// Build upstream URL with proper encoding and minimal validation for enums
	in := r.URL.Query()

	// Minimal validation for known enums (silently ignore invalid to match upstream behavior or respond 400?)
	if v := in.Get("status"); v != "" {
		if v != "alive" && v != "dead" && v != "unknown" {
			http.Error(w, "invalid status; must be one of: alive, dead, unknown", http.StatusBadRequest)
			return
		}
	}
	if v := in.Get("gender"); v != "" {
		if v != "female" && v != "male" && v != "genderless" && v != "unknown" {
			http.Error(w, "invalid gender; must be one of: female, male, genderless, unknown", http.StatusBadRequest)
			return
		}
	}

	u, err := url.Parse(baseURL)
	if err != nil {
		http.Error(w, "server error", http.StatusInternalServerError)
		return
	}
	qs := url.Values{}
	for _, k := range passthrough {
		if v := in.Get(k); v != "" {
			qs.Set(k, v)
		}
	}
	u.RawQuery = qs.Encode()

	client := &http.Client{Timeout: 10 * time.Second}
	resp, err := client.Get(u.String())
	if err != nil {
		http.Error(w, "upstream error", http.StatusBadGateway)
		return
	}
	defer resp.Body.Close()

	for k, v := range map[string]string{
		"Content-Type":                "application/json",
		"Access-Control-Allow-Origin": "*",
	} {
		w.Header().Set(k, v)
	}
	w.WriteHeader(http.StatusOK)
	_, _ = io.Copy(w, resp.Body)
}

func proxyDetail(w http.ResponseWriter, fullURL string) {
	u, err := url.Parse(fullURL)
	if err != nil {
		http.Error(w, "server error", http.StatusInternalServerError)
		return
	}
	client := &http.Client{Timeout: 10 * time.Second}
	resp, err := client.Get(u.String())
	if err != nil {
		http.Error(w, "upstream error", http.StatusBadGateway)
		return
	}
	defer resp.Body.Close()

	for k, v := range map[string]string{
		"Content-Type":                "application/json",
		"Access-Control-Allow-Origin": "*",
	} {
		w.Header().Set(k, v)
	}
	w.WriteHeader(http.StatusOK)
	_, _ = io.Copy(w, resp.Body)
}

func commonHeaders(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("X-Frame-Options", "DENY")
		w.Header().Set("X-Content-Type-Options", "nosniff")
		next.ServeHTTP(w, r)
	})
}

func getEnv(key, def string) string {
	if v := os.Getenv(key); v != "" {
		return v
	}
	return def
}
