function buildSlider() {

    function buildItem(text, active) {
        return {
            attributes: {
                class: active ? 'carousel-item active' : 'carousel-item'
            },
            children: [
                {
                    tagName: 'img',
                    attributes: {
                        class: 'w-100 d-block',
                        src: `https://via.placeholder.com/800x400?text=${text}`
                    },
                }
            ]
        }
    }


    return {
        attributes: {
            class: 'carousel slide',
            'data-ride': 'carousel'
        },
        children: [
            {
                attributes: {
                    class: 'carousel-inner',
                },
                children: [
                    buildItem('first slide', true),
                    buildItem('second slide'),
                    buildItem('third slide'),
                    buildItem('forth slide'),
                ]
            }
        ]
    }

}
