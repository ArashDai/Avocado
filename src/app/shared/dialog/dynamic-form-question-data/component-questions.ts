
export const componentQuestions = {
    textbox : [
        {
            key: 'Name',
            label: 'Name',
            required: true,
        },
        {
            key: 'Description',
            label: 'Description',
            required: true
        }
    ],
    dropdown : [
        {
            key: 'type',
            label: 'Type',
            required: false,
            options:[
                { key: 'type', value: "type" }
            ]
        },
        {
            key: 'options',
            label: 'Options',
            required: false,
            options:[
                { key: 'option', value: "option" }
            ]
        },
        {
            key: 'categories',
            label: 'Categories',
            required: false,
            options:[
                { key: 'category', value: "category" }
            ]
        },
    ]
};