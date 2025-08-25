# Build stage
FROM golang:1.22-alpine AS builder
WORKDIR /app
RUN apk add --no-cache git build-base
# Copy module files first to leverage Docker layer caching
COPY go.mod .
# If go.sum exists in repo, copy it too (won't fail if absent)
# Using a separate step to avoid cache bust if go.sum is absent
RUN if [ -f go.sum ]; then echo "go.sum exists"; fi
# Download dependencies (may generate go.sum in this layer)
RUN go mod download

# Copy the rest of the source
COPY . .
# Ensure go.sum is generated/updated inside the image
RUN go mod tidy

# Build the binary
RUN CGO_ENABLED=0 GOOS=linux go build -ldflags="-w -s" -o main ./cmd/api/main.go

# Final stage
FROM alpine:latest
RUN apk --no-cache add ca-certificates tzdata
WORKDIR /root/
COPY --from=builder /app/main .
EXPOSE 8080
HEALTHCHECK --interval=30s --timeout=3s CMD wget --no-verbose --tries=1 --spider http://localhost:8080/api/v1/health || exit 1
CMD ["./main"]
