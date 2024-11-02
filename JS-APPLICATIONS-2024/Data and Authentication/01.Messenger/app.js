function attachEvents() {
    const submitBtn = document.querySelector('#submit');
    const refreshBtn = document.querySelector('#refresh');
    const messages = document.querySelector('#messages');
    const url = 'http://localhost:3030/jsonstore/messenger';

    submitBtn.addEventListener('click', async () => {
        let authorName = document.querySelector('#controls > input[type=text]:nth-child(2)').value;
        let msgText = document.querySelector('#controls > input[type=text]:nth-child(5)').value;
        let data = {
            author: authorName,
            content: msgText,
        }
        // if (!authorName || !msgText) {
        //     return
        // }
        // console.log(msgText)
        await fetch(url, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-type": "application/json"
            }
        })
    })

    refreshBtn.addEventListener('click', async () => {
        document.querySelector('#messages').replaceChildren();
        let currMessages = await fetch(url).then(res => res.json());
        let final = []
        Object.values(currMessages).forEach(el => {
            final.push(`${el.author}: ${el.content}`)
            
        })
        messages.textContent = final.join('\n')
        // console.log(currMessages)

    })
}

attachEvents();