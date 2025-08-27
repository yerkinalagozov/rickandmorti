# Развертывание проекта на Vercel

## Настройки для деплоя:

### Framework Preset
- Выбрать: **Other**

### Root Directory
- Оставить: **`./`** (корень проекта)

### Build and Output Settings

#### Build Command
```
npm run vercel-build
```
или
```
npm run build
```

#### Output Directory
```
public
```
(если существует, или `.`)

#### Install Command
```
yarn install
```
,
```
pnpm install
```
,
```
npm install
```
или
```
bun install
```

### Environment Variables
- Добавить переменные окружения через кнопку **"Add More"**
- Пример: 
  - Key: `EXAMPLE_NAME`
  - Value: `I9JU23NF394R6HH`

### Финальный шаг
- Нажать кнопку **Deploy** для запуска деплоя

---

**Примечание**: Убедитесь, что в вашем проекте есть соответствующие npm скрипты в `package.json` для команд сборки.