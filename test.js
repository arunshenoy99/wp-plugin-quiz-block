// THIS IS A DEMO OF HOW JSX GETS CONVERTED TO TRADITIONAL JAVASCRIPT FOR REGISTRING BLOCK TYPES
wp.blocks.registerBlockType('ourplugin/are-you-paying-attention', {
    title: 'Are you paying attention?',
    icon: 'smiley',
    category: 'common',
    edit: () => {
        return wp.element.createElement('h3', null, 'Hello this is from the admin editor screen')
    },
    save: () => {
        return wp.element.createElement('h1', null, 'Hello this is the front end screen')
    }
})