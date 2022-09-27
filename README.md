# API Aeropuerto

## Se creo una api en nodejs conectado una base de datos hecha en mariadb (por medio de un ORM denomido prisma) 

El dispositivo debe tener instalado las siguientes dependencias.
- MariaDB
- NodeJS

Una vez verificado lo anterior se deben seguir los siguientes pasos para que el proyecto funcione de manera correcta

1. Una vez hecho la descarga del respositorio se abre una nueva terminal y se ingresa la carpeta

```
cd ApiAiport
```

2. Se realiza la instalación de dependencias de NodeJS

```
npm i
```

3. Se crea un archivo con el nombre .env y se agrega lo siguiente

```
cat .env
DATABASE_URL="mysql://usuario:clave@localhost:puerto/aeropuerto?schema=public"
```

4. Se realiza la migración de prisma a la base de datos

```
npx prisma db push
```

5. Ejecución del proyecto

```
npm start
```
