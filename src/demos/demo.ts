export default {
    name: 'Demo',
    schema: {
        type: 'object',
        properties: {
            name: {
                type: 'string'
            },
            age: {
                type: 'number'
            },
            love: {
                type: 'array',
                items: [
                    {
                        type: 'string'
                    },
                    {
                        type: 'number'
                    }
                ]
            },
            hobby: {
                type: 'array',
                items: {
                    type: 'string'
                }
            },
            language: {
                type: 'array',
                items: {
                    type: 'string',
                    enum: ['English', 'Chinese', 'Japanese']
                }
            }
        }
    },
    uiSchema: {},
    value: {
        name: 'Mao',
        age: 18,
        hobby: ['Coding']
    }
}
