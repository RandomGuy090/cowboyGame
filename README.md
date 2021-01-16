# cowboyGame
## instrukcja
Gra zaczyna się od menu startowego, klikając na przyciski player1 lub player2 wybiera się kolor
graczy. klawiatura niżej pokazuje przyciski sterowania dla graczy, gracz po lewej - LShift, po prawej Enter. po kliknięciu 
na rewolwer po prawej stronie rozpoczyna się odliczanie. Po zakończeniu odliczania pierwszy gracz który wciśnie swój przycisk
wygrywa. Po rozegranej walce wyśwetla się końcowe menu zawierające czas reakcji, grafiki oraz strzałkę powrotu do menu startowego.

Kolory graczy sa zapisywane w pamięci przeglądarki, by usunąć zbędne już zmienne należy wywołać w konsoli funkcję: 
```js
wipeLocalStorage()
```

## instruction
Game starts with start menu. After clicking player1 or player2 button in the upper corners, you can choose player colors. 
Keyboard below shows player's buttons, LSHIFT for left and ENTER for right player. To start game you have click revolver right side, 
after that the countdown will start. When countdown is over, game will start and player who press his button first will win.
After the duel, end menu will appear with reaction time, arts, and restart arrow

Colors are stored at localStorage of browser. To wipe them call function:

```js
wileLocalStorage()
```
##
start menu:
![LOL](https://user-images.githubusercontent.com/64653975/104821993-fa45e280-583f-11eb-984d-0eb169143b8d.png)
duel:
![lol2](https://user-images.githubusercontent.com/64653975/104821994-fdd96980-583f-11eb-81a4-4110485b5865.png)
end menu:
![lol3](https://user-images.githubusercontent.com/64653975/104822031-32e5bc00-5840-11eb-8cf5-02989c01eb3a.png)
