
function buildElement(config) {
    const  el = document.createElement(config.tagName || 'div');
    if(config.text) {
        el.innerText = config.text
    }
    if(config.attributes) {
        for(let attribute in config.attributes) {
            el.setAttribute(attribute, config.attributes[attribute]);
        }
    }
    if(config.children) {
        config.children.forEach(function(childConfig) {
            const childElement = buildElement(childConfig);
            el.appendChild(childElement);
        });
    }
    if(config.events) {
        for(let eventName in config.events) {
            config.events[eventName].forEach(function(callback) {
                el.addEventListener(eventName, callback);
            })
        }
    }

    return el;
};


const myConfig = {
    tagName: 'div',
    attributes: {
        id: 'main',
    },
    children: [
        buildSlider(),
        {
            attributes: {
                class: 'container',
            },
            children: [
                {
                    attributes: {
                        class: 'row',
                    },
                    children: [
                        {
                            attributes: {
                                class: 'col-4',
                            },
                            children: [
                                buildCard()
                            ]
                        },
                        {
                            attributes: {
                                class: 'col-4',
                            },
                            children: [
                                buildCard()
                            ]
                        },
                        {
                            attributes: {
                                class: 'col-4',
                            },
                            children: [
                                buildCard()
                            ]
                        },
                        {
                            attributes: {
                                class: 'col-6',
                            },
                            children: [
                                buildCard()
                            ]
                        },
                        {
                            attributes: {
                                class: 'col-6',
                            },
                            children: [
                                buildCard()
                            ]
                        }
                    ]
                }
            ]
        }
    ],
}

const myEl = buildElement(myConfig);

document.body.appendChild(myEl);