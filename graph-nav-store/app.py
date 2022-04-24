from pywebvue import App

app = App('Super cool web app')

app.layout = '''
    <v-app>
        <v-app-bar app>
            <v-icon class="mr-4">mdi-menu</v-icon>
            Welcome
            <v-spacer />
        </v-app-bar>
        <v-main>
            <v-container fluid>
                Hello World, this is my first Web App...
            </v-container>
        </v-main>
    </v-app>
'''

def update_page(index=1):
    app.layout = f'./template-{index}.html'

if __name__ == "__main__":
    app.run_server()