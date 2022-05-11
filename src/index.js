wp.blocks.registerBlockType('ourplugin/are-you-paying-attention', {
    title: 'Are you paying attention?',
    icon: 'smiley',
    category: 'common',
    attributes: {
        skyColor: {
            type: 'string'
        },
        grassColor: {
            type: 'string'
        }
    },
    edit: (props) => {
        function updateSkyColor(event) {
            props.setAttributes({
                skyColor: event.target.value
            })
        }
        function updateGrassColor(event) {
            props.setAttributes({
                grassColor: event.target.value
            })
        }
        return (
            <>
            <input type="text" placeholder="sky color" value = {props.attributes.skyColor} onChange = {updateSkyColor}/>
            <input type="text" placeholder="grass color" value = {props.attributes.grassColor} onChange = {updateGrassColor} />
            </>
        )
    },
    save: () => {
        // We can also pass hardcoded html here but better to create dynamic blocks from php.
        return null
    }
    // We use deprecated and pass the old block code into it so that we dont get that weird error from wordpress.
    // saying that we have an invalid block type. Once we have the old block code in this then we can
    // make changes to the block code as necessary and then we wont get that error.
    // deprecated: [{
    //     save: (props) => {
    //         console.log("asdasdsad" + props.attributes.skyColor)
    //         return (
    //             <p>Today the sky is {props.attributes.skyColor} and the grass is {props.attributes.grassColor}.</p>
    //         )
    //     },
    //     attributes: {
    //         skyColor: {
    //             type: 'string'
    //         },
    //         grassColor: {
    //             type: 'string'
    //         }
    //     },
    // }]
})