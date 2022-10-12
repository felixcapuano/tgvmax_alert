from pydantic import BaseSettings


class Settings(BaseSettings):
    BASE_URL: str = "https://sncf-simulateur-api-prod.azurewebsites.net"

    DISCORD_TOKEN: str
    DISCORD_GUILD: str
    DISCORD_CHANNEL: str

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"

settings = Settings()