import {TextControl, Flex, FlexBlock, FlexItem, Button, Icon, PanelBody, PanelRow} from '@wordpress/components'
import {InspectorControls, BlockControls, AlignmentToolbar} from '@wordpress/block-editor'
import {ChromePicker} from 'react-color'
import './index.scss'

(function() {
    let locked = false
    wp.data.subscribe(function () {
        const results = wp.data.select('core/block-editor').getBlocks().filter((block) => {
            return block.name == "ourplugin/are-you-paying-attention" && block.attributes.correctAnswer == undefined
        })
        if (results.length && locked == false) {
            locked = true
            wp.data.dispatch('core/editor').lockPostSaving('noanswer')
        }
        if (! results.length && locked == true) {
            locked = false
            wp.data.dispatch('core/editor').unlockPostSaving('noanswer')
        }
    })
})()

wp.blocks.registerBlockType('ourplugin/are-you-paying-attention', {
    title: 'Are you paying attention?',
    icon: 'smiley',
    category: 'common',
    attributes: {
        question: {
            type: 'string'
        },
        answers: {
            type: 'array',
            default: ['']
        },
        correctAnswer: {
            type: 'number',
            default: undefined
        },
        bgColor: {
            type: 'string',
            default: '#ebebeb'
        },
        theAlignment: {
            type: 'string',
            default: 'left'
        }
    },
    description: 'Give your readers a quick quiz.',
    // Used for preview of the block
    example: {
        attributes: {
            question: 'What is your name',
            correctAnswer: 3,
            answers: ['Arun', 'Test'],
            theAlignment: 'center',
            bgColor: '#cfe8f1'
        }
    },
    edit: EditComponent,
    save: () => {
        // We can also pass hardcoded html here but better to create dynamic blocks from php.
        return null
    }
})

function EditComponent(props) {

    function updateQuestion(value) {
        props.setAttributes({
            question: value
        })
    }

    function deleteAnswer(indexToDelete) {
        const newAnswers = props.attributes.answers.filter((answer, index) => {
            return index != indexToDelete
        })
        props.setAttributes({
            answers: newAnswers
        })
        if (indexToDelete == props.attributes.correctAnswer) {
            props.setAttributes({
                correctAnswer: undefined
            })
        }
    }

    function markAsCorrect(indexAsCorrect) {
        props.setAttributes({
            correctAnswer: indexAsCorrect
        })
    }
    return (
        <div className='paying-attention-edit-block' style={{ backgroundColor: props.attributes.bgColor }}>
            <BlockControls>
                <AlignmentToolbar value={props.attributes.theAlignment} onChange={(alignment) => props.setAttributes({ theAlignment: alignment})} />
            </BlockControls>
            <InspectorControls>
                <PanelBody title="Background color" initialOpen={true}>
                    <PanelRow>
                        <ChromePicker color={props.attributes.bgColor} onChangeComplete={(color) => props.setAttributes({ bgColor: color.hex })} disableAlpha={true}/>
                    </PanelRow>
                </PanelBody>
            </InspectorControls>
            <TextControl label='Question:' style={{ fontSize: '20px' }} value={props.attributes.question} onChange={updateQuestion}/>
            <p style={{ fontSize: "13px", margin: "20px 0px 8px 0px" }}>Answers:</p>
            {props.attributes.answers.map((answer, index) => {
                return (
                    <Flex>
                        <FlexBlock>
                            <TextControl autoFocus={answer == undefined} value={answer} onChange={(newValue) => {
                                const newAnswers = props.attributes.answers.concat([])
                                newAnswers[index] = newValue
                                props.setAttributes({
                                    answers: newAnswers
                                })
                            }}/>
                        </FlexBlock>
                        <FlexItem>
                            <Button onClick={() => markAsCorrect(index)}>
                                <Icon className='mark-as-correct' icon={index == props.attributes.correctAnswer ? 'star-filled': 'star-empty'} />
                            </Button>
                        </FlexItem>
                            <Button isLink className='attention-delete' onClick={() => deleteAnswer(index)}>Delete</Button>
                        <FlexItem>
                        </FlexItem>
                    </Flex>
                )
            })}
            <Button variant='primary' onClick={() => {
                props.setAttributes({
                    answers: props.attributes.answers.concat([undefined])
                })
            }}>Add Another Answer</Button>
        </div>
    )
}