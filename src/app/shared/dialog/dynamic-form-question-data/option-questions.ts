export const optionQuestions = {
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
        },
    ],
    dropdown : [
        {
            key: 'categories',
            label: 'Categories',
            required: false,
            options:[
                { key: 'category', value: "category" }
            ]
        },
        {
            key: 'type',
            label: 'Type',
            required: false,
            options:[
                { key: 'type', value: "type"}
            ]
        }
    ]

};