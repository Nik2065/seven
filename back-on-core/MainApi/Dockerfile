#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:3.1 AS base
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/sdk:3.1 AS build
WORKDIR /src
COPY ["MainApi/MainApi.csproj", "MainApi/"]
RUN dotnet restore "MainApi/MainApi.csproj"
COPY . .
WORKDIR "/src/MainApi"
RUN dotnet build "MainApi.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "MainApi.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "MainApi.dll"]