# pacman game

make the classic pacman from provided code.

1. git clone https://github.com/timoweave/cd_pacman_basic.git
1. cd cd_pacman_basic && open index.html

# make all the required task

1. move pacman up and down.
1. confine pacman within the walls, and not walk into brick
1. add score display, each coins = 10 points
1. make the maze bigger 20x20
1. have cherries avoid for pacman to get
1. pacman turn its face towards the moving direction

# make various improvement

1. make the code more readable, split css, html, js into their own file.
1. improve DOM speed, O(1) instead of O(n^2) every time pacman moves (n = width)
1. create all pacman, bricks, coins, blanks, cherries elements all at onces, O(n^2)
1. move pacman, and change the back-tile one at a time, O(1), not overwrite with new one O(n^2)*2
