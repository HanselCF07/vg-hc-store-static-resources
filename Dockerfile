# Usa la versión LTS de Node 22 en su versión ligera (Alpine Linux)
FROM node:22-alpine

# Crea y define el directorio de trabajo
WORKDIR /usr/src/vg-hc-store-static-resources

# Copia solo los archivos de dependencias para aprovechar el caché de capas de Docker
COPY package*.json ./

# Instala las dependencias (puedes usar 'npm ci' para builds más limpios en CI/CD)
RUN npm install --omit=dev

# Copia el resto del código de la aplicación
COPY . .

# Expone el puerto que usa Express (por defecto suele ser 3000)
EXPOSE 3000

# Ejecuta la aplicación
CMD ["node", "server.js"]
