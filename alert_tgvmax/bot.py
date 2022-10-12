from datetime import date, timedelta
import discord
from discord.ext import commands

from alert_tgvmax.settings import Settings

settings = Settings()

class DropdownHours(discord.ui.Select):
    def __init__(self):
        name = "Date"
        options = list(map(self.date_from_today, range(25)))
        self.today = date.today()
        super().__init__(placeholder=name, min_values=1, max_values=1, options=options)
    

    async def callback(self, interaction: discord.Interaction):
        # await interaction.response.send_message(f'Your favourite colour is {self.values[0]}')
        await interaction.response.send_message()
        print(f"set value {self.values[0]}")

class DropdownDate(discord.ui.Select):
    def __init__(self):
        name = "Date"
        options = map(self.date_from_today, range(25))
        self.today = date.today()
        super().__init__(placeholder=name, min_values=1, max_values=1, options=options)
    
    def date_from_today(self, day_gap):
        compute_date = date.today() + timedelta(days=day_gap)
        date_str = compute_date.strftime("%A, %d %B %Y")
        return discord.SelectOption(label=date_str, value=date_str)

    async def callback(self, interaction: discord.Interaction):
        print(f"set value {self.values[0]}")
        await interaction.response.s("good")


class DropdownView(discord.ui.View):
    def __init__(self):
        super().__init__()

        # Adds the dropdown to our view object.
        self.add_item(DropdownDate())


class Bot(commands.Bot):
    def __init__(self):
        intents = discord.Intents.default()
        intents.message_content = True

        super().__init__(command_prefix=commands.when_mentioned_or('!'), intents=intents)

    async def on_ready(self):
        print(f'Logged in as {self.user} (ID: {self.user.id})')
        print('------')


bot = Bot()


@bot.command()
async def colour(ctx):
    """Sends a message with our dropdown containing colours"""

    # Create the view containing our dropdown
    view = DropdownView()

    # Sending a message containing our view
    await ctx.send('Pick your favourite colour:', view=view)



def start_bot():
    bot.run(settings.DISCORD_TOKEN)
