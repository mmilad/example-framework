function buildCard(src, text) {
    return {
        attributes: {
            class: 'card'
        },
        children: [
            {
                tagName: 'img',
                attributes: {
                    src: src || 'https://via.placeholder.com/400x200',
                    class: 'card-img-top'
                },
            },
            {
                class: 'card-body',
                children: [
                    {
                        tagName: 'p',
                        text: text || "Some quick example text to build on the card title and make up the bulk of the card's content.",
                        attributes: {
                            class: 'card-text'
                        }
                    }
                ]
            }
        ]
    }
}
