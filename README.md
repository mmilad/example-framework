# example-framework
The intend of this project is not to be used in a real use case but to showcase the benefits of 
working with a framework and how one could look like. We will use JavaScript for this project. 

## What is Framework in simple terms?
In general, a framework is a real or conceptual structure intended to serve as a support or guide for the building of something that expands the structure into something useful.

## Lets get started

Create elements in JavaScript:
```
const el = document.createElement('div');
```

In the snippet above we did create a div element with the ```document.createElement``` method.
We are going to do this more often and do more than just create a regular ```DIV``` element, so we are going to wrap this snipped into a function.

```
function buildElement(tagName) {
    const  el = document.createElement(tagName);

    return el;
}

```

We defined a function to do basically the same like we did before. So far we dont really have any benefits, but we are going to add some.
The first thing we want to do is to add some text.

```
function buildElement(tagName, innerText) {
    const  el = document.createElement(tagName);
    el.innerText = innerText
    return el;
}

```

In the example above we do now create an element and add a innerText to it, wich is basically the contained text of an element. Our function has now two parameters and we want to do much more than defining the element type and the text, so instead of demanding multiple parameters, we are going to use a singe one, which is an object.

```
function buildElement(config) {
    const  el = document.createElement(config.tagName || 'div');
    if(config.text) {
        el.innerText = config.text
    }
    return el;
}

```

As you can see we replaced `tagName` and `innerText` with `config` which is an object that could contain a `tagName` and / or `text` property. We did also some adjustments.

- if `config.tagName` is not set, we do fallback to `'div'`
- if `config.text` is not set, we wont set the innerText on the element, as it would result in an error.

The tagName and text is not enough When defining a regular HTML element. We usally want to set attributes like id and / or classe(s), so we need to add this possibility as well.

<details>
<summary>Check current configuration</summary>
<code>

    const myConfig = {
        tagName: 'div',
        id: 'myId',
        class: 'myClass'
    }

</code>
</details>


```
function buildElement(config) {
    const  el = document.createElement(config.tagName || 'div');
    if(config.text) {
        el.innerText = config.text
    }
    if(config.id) {
        el.id = config.id
    }
    if(config.class) {
        el.className = config.class
    }

    return el;
}

```

We now can set the `id` and the `className`, but we added 6 lines of code for that and there are a lot more attributes we might want to add (href, title, name, src and so on), so we do need to be a bit smarter here. Instead of passing all attributes we want to add on the top level of the configuration, we are going to define a new property called `attributes` where all our attributes can be defined.

<details>
<summary>Check current configuration</summary>
<code>

    const myConfig = {
        tagName: 'div',
        attributes: {
            id: 'myId',
            class: 'myClass',
            title: 'myTitle'
        }
    }

</code>
</details>


```
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

    return el;
}

```

Now we reduced the lines of code from 6 lines to 5 lines, but we added a lot more power to it.
We take advantage of the `setAttribute` method of dom element to define our attributes instead of accessing the desired attributes directly. for this we do use a for-in loop to iterate our `config.attributes` object, and use the key as the attribute to set (id, class, title etc.).
With this change, we can add any possible attribute we want without having to change our function, which is a huge improvement. However, this is still not enough. 
A HTML element can also contain one or many children and we want to add this as an feature to our function.


<details>
<summary>Check current configuration</summary>
<code>

    const myConfig = {
        tagName: 'div',
        attributes: {
            id: 'myId',
            class: 'myClass',
            title: 'myTitle'
        },
        children: [
            {
                tagName: 'p',
                text: 'i am a paragraph'
            },
            {
                tagName: 'a',
                text: 'i am an anchor which directs to https://google.com',
                attributes: {
                    href: 'https://google.com',
                    target: 'blank'
                }
            }
        ]
    }

</code>
</details>


```
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

    return el;
}

```

We added another 5 lines of code which gaves us even greater power than the previous 5 lines we defined.
Now we can add an infinite nested structure with that change, but exactly what is happening there?
First we defined the `config.children` property on our configuration, which is an array of objects holding the same structure like our basic configuration. Then we check if the `config.children` property is setso we dont get an error when trying to iterate through it.
In the next step we use the `forEach` method of arrays to iterate through all "child configurations" which we call `childConfig`.
Here is where the real magic is happening. we use our `buildElement` function inside our `buildElement` function to create child elements. This is called a recursion and has the huge benefit that every change or added feature we add in our function will also happen on that line. Finally we add the generated child element to our current element.

What we have so far is a function to create an element that can have:

- a choosen tag name
- a text
- an id
- a class or multiple classes
- a list of children that can have everything mentioned above

With this, we can technically already create a static website, but we actually want more. We want to add `Events` like click, keyDown, keyUp, mouseenter, mouseleave and so on.
For this, we could pretty much do the same like we did with the attributes and use event names instead of attribute names, but that wont be sufficient, because we might want to register multiple event handlers on the same event name, so we will a list of callbacks.

<details>
<summary>Check current configuration</summary>
<code>

    const myConfig = {
        tagName: 'div',
        attributes: {
            id: 'myId',
            class: 'myClass',
            title: 'myTitle'
        },
        children: [
            {
                tagName: 'p',
                text: 'i am a paragraph'
            },
            {
                tagName: 'a',
                text: 'i am an anchor which directs to https://google.com',
                attributes: {
                    href: 'https://google.com',
                    target: 'blank'
                }
            }
        ],
        events: {
            click: {
                function() {
                    console.log('first click callback')
                },
                function() {
                    console.log('second click callback')
                }
            },
            mouseenter: [
                function() {
                    console.log('mouse did enter)
                }
            ]
        }
    }

</code>
</details>


```
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
                el.addEventlistener(eventName, callback);
            })
        }
    }

    return el;
}

```

Now create a function to return the configuration for an example card component

```

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

const myCard = buildElement(buildCard());

```

### Summary

So far we build our example framework, but what is it good for? Its actually simpler to build just simple HTML instead to go through all the pain and declare your DOM structure via JSON. However, if you want to work with components like cards, teasers or text-media sections and you use them accross your page, it would be hard maintain them if not split into components. If you want to change a class for example, you would need to go through all pages to make you changes. 
As mentioned in the beginning, this is just an example how a framework could look like, there are already a lot of better solutions and this project is mainly intended for educational reasons.