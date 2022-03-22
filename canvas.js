import platform from '../img/i.png'
import hills from '../img/qm.png'
import background from '../img/b1.png'
import platformSmallTall from '../img/platformSmallTall.png'
import s from '../img/Wolf1.png'
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 900
canvas.height = 650
const gravity = 0.5
class Player {
  constructor() {
    this.speed = 15
    this.position = {
      x: 100,
      y: 100
    }
    this.velocity = {
      x: 0,
      y: 1
    }

    this.width = 229
    this.height = 150
    this.image = createImage(s)
  }
  draw() {
    c.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.width,
      this.height)
  }

  update() {
    this.draw()
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y
    if (this.position.y + this.height + this.velocity.y <= canvas.height)
      this.velocity.y += gravity

  }
}

class Platform {
  constructor({ x, y, image }) {
    this.position = {
      x,
      y
    }
    this.image = image
    this.width = image.width
    this.height = image.height

  }
  draw() {
    c.drawImage(this.image, this.position.x, this.position.y)
  }
}

class G {
  constructor({ x, y, image }) {
    this.position = {
      x,
      y
    }
    this.image = image
    this.width = image.width
    this.height = image.height

  }
  draw() {
    c.drawImage(this.image, this.position.x, this.position.y)
  }
}
function createImage(imageSrc) {
  const image = new Image()
  image.src = imageSrc
  return image
}

let platformImage = createImage(platform)
let platformSmallTallImage = createImage(platformSmallTall)
let player = new Player()
let platforms = []
let Gs = []

const keys = {
  right: {
    pressed: false
  },
  left: {
    pressed: false
  }
}

let scrollOffset = 0



function init() {


  platformImage = createImage(platform)
  player = new Player()
  platforms = [
    new Platform({ x: platformImage.width * 4 + 400 - 2 + platformImage.width - platformSmallTallImage.width, y: 330, image: createImage(platformSmallTall) }),
    new Platform({x: platformImage.width * 5 + 1100 - 2 + platformImage.width - platformSmallTallImage.width, y: 330, image: createImage(platformSmallTall)}),
        new Platform({x: platformImage.width * 6 + 1500 - 2 + platformImage.width - platformSmallTallImage.width, y: 330, image: createImage(platformSmallTall)}),
        new Platform({x: platformImage.width * 7 + 2400 - 2 + platformImage.width - platformSmallTallImage.width, y: 330, image: createImage(platformSmallTall)}),
        new Platform({x: platformImage.width * 8 + 3000 - 2 + platformImage.width - platformSmallTallImage.width, y: 330, image: createImage(platformSmallTall)}),
        

    new Platform({ x: -1, y: 550, image: platformImage }),
    new Platform({ x: platformImage.width - 3, y: 550, image: platformImage }),
    new Platform({ x: platformImage.width * 2 + 100, y: 550, image: platformImage }),
    new Platform({ x: platformImage.width * 3 + 400, y: 550, image: platformImage }),
    new Platform({ x: platformImage.width * 4 + 400 - 2, y: 550, image: platformImage }),
    new Platform({ x: platformImage.width * 5 + 700 - 2, y: 550, image: platformImage }),
        new Platform({ x: platformImage.width * 6 + 800 - 3, y: 550, image: platformImage }),
        new Platform({ x: platformImage.width * 7 + 800 - 2, y: 550, image: platformImage }),
        new Platform({ x: platformImage.width * 8 + 800 - 2, y: 550, image: platformImage }),
        new Platform({ x: platformImage.width * 9 + 800 - 2, y: 550, image: platformImage }),
        
  ]
  Gs = [
    new G({
      x: -1,
      y: -1,
      image: createImage(background)
    }),
    new G({
      x: -1,
      y: -1,
      image: createImage(hills)
    })
  ]



  scrollOffset = 0
}
function animate() {
  requestAnimationFrame(animate)
  c.fillStyle = "white"
  c.fillRect(0, 0, canvas.width, canvas.height)
  Gs.forEach(G => {
    G.draw()
  })
  platforms.forEach(platform => {
    platform.draw()
  })
  player.update()

  if (keys.right.pressed && player.position.x < 400) {
    player.velocity.x = player.speed
  } else if ((keys.left.pressed && player.position.x > 100) || keys.left.pressed && scrollOffset === 0 && player.position.x > 0) {
    player.velocity.x = -player.speed
  } else {
    player.velocity.x = 0

    if (keys.right.pressed) {
      scrollOffset += player.speed
      platforms.forEach(platform => {
        platform.position.x -= player.speed
      })
      Gs.forEach(G => {
        G.position.x -= player.speed * 0.66
      })

    } else if (keys.left.pressed && scrollOffset > 0) {
      scrollOffset -= 5
      platforms.forEach(platform => {
        platform.position.x += player.speed
      })
      Gs.forEach(G => {
        G.position.x += player.speed * 0.66
      })

    }
  }

  console.log(scrollOffset)

  platforms.forEach(platform => {
    if (player.position.y + player.height <= platform.position.y && player.position.y + player.height + player.velocity.y >= platform.position.y && player.position.x + player.width >= platform.position.x && player.position.x <= platform.position.x + platform.width) {
      player.velocity.y = 0
    }
  })

  if (scrollOffset > platformImage.width * 5 + 700 - 2) {
    console.log('you win')
  }
  if (player.position.y > canvas.height) {

    init()
  }
}
init()
animate()
addEventListener('keydown', ({ keyCode }) => {
  console.log(keyCode)
  switch (keyCode) {
    case 65:
      console.log('left')
      keys.left.pressed = true
      break

    case 83:
      console.log('down')
      break

    case 68:
      console.log('right')
      keys.right.pressed = true
      break

    case 87:
      console.log('up')
      player.velocity.y -= 15
      break
  }

})


addEventListener('keyup', ({ keyCode }) => {
  console.log(keyCode)
  switch (keyCode) {
    case 65:
      console.log('left')
      keys.left.pressed = false
      break

    case 83:
      console.log('down')
      break

    case 68:
      console.log('right')
      keys.right.pressed = false
      break

    case 87:
      console.log('up')

      break
  }
})
