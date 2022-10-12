import datetime
import requests
from alert_tgvmax.bot import start_bot
from alert_tgvmax.settings import settings


departure = "PARIS (intramuros)"
destination = "VALENCE TGV RHONE ALPES SUD"

start_period = datetime.datetime(year=2022, month=10, day=10, hour=12)
end_period = datetime.datetime(year=2022, month=10, day=10, hour=23)

search_url = settings.BASE_URL + "/api/RailAvailability/Search"


def build_request_url(
    base_url,
    departure: str,
    destination: str,
    start: datetime.datetime,
    end: datetime.datetime,
) -> str:
    start_str = start.isoformat(timespec="seconds")
    end_str = end.isoformat(timespec="seconds")

    return f"{base_url}/{departure}/{destination}/{start_str}/{end_str}"


def job():
    request_url = build_request_url(
        search_url, departure, destination, start_period, end_period
    )

    result = requests.get(request_url)
    import pprint
    pprint.pprint(result.json())


def main():
    start_bot()
