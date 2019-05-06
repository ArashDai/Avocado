export const modifierQuestions = {
    textbox : [
        {
            key: 'name',
            label: 'Name',
            required: true,
        },
        {
            key: 'description',
            label: 'Description',
            required: true
        },
        {
            key: 'fee',
            label: 'Fee',
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
                { key: 'option', value: "option"}
            ]
        },
        {
            key: 'categories',
            label: 'Categories',
            required: false,
            options:[
                { key:'category', value: "category" }
            ]
        },
        {
            key: 'additions',
            label: 'Additions',
            required: false,
            options:[
                { key: 'component', value: "component" }
            ]
        },
        {
            key: 'removals',
            label: 'Removals',
            required: false,
            options:[
                { key:'component', value: "component" }
            ]
        },
    ]
};