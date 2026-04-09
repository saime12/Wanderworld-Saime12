const worldDiv = document.getElementById("world")
const joinName = document.getElementById("joinName")
const joinBtn = document.getElementById("joinBtn")
const text = document.getElementById("text")
const textBtn = document.getElementById("textBtn")
let playerKey = ""

async function postJoin() {
    const resp = await fetch("https://tinkr.tech/sdb/wanderworld/wanderworld", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            action: "join",
            username: joinName.value
        })
    })
    const data = await resp.json()

    if(data.ok) {
        playerKey = data.player_key
    }
    else {
        alert("Player already in game")
    }
}

async function postMove() {
        const resp = await fetch("https://tinkr.tech/sdb/wanderworld/wanderworld", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            action: "move",
            player_key: playerKey,
            x: 200,
            Y: 100
        })
    })
}

async function sendMessage() {
    const resp = await fetch("https://tinkr.tech/sdb/wanderworld/wanderworld", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            action: "talk",
            player_key: playerKey,
            message: text.value
        })
    })
}

textBtn.addEventListener('click', function() {
    sendMessage()
})

joinBtn.addEventListener('click', async function() {
    await postJoin()
})

async function  getData() {
    const resp = await fetch("https://tinkr.tech/sdb/wanderworld/wanderworld")
    const data = await resp.json()
    return data.players
}

async function render() {
    const players = await getData()

    for(const player of players) {
        const playerDiv = document.createElement("div")
        const img = document.createElement("img")
        const name = document.createElement("h5")
        name.textContent = player.username
        playerDiv.classList.add("playerDiv")
        playerDiv.style.left = player.x + "px"
        playerDiv.style.top = player.y + "px"
        img.src = "https://tinkr.tech" + player.image

        if(player.message !== null ) {
            const speech = document.createElement('h4')
            speech.classList.add("message")
            speech.textContent = player.message
            playerDiv.appendChild(speech)
        }

        playerDiv.appendChild(name)
        playerDiv.appendChild(img)
        worldDiv.appendChild(playerDiv)
    }
}

setInterval(async function() {
    worldDiv.innerHTML = ""
    await render()
}, 1000) 