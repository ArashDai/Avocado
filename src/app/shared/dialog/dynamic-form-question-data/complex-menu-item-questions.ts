export const complexMenuItemQuestions = {
        dropdown : [
            {
                key: 'options',
                label: 'Options',
                required: false,
                options:[
                    { key: 'option', value: "option"}
                ]
            },
            {
                key: 'modifiers',
                label: 'Modifiers',
                required: false,
                options:[
                    { key: 'modifier', value: "modifier"}
                ]
            }
            // { //leaving these out until I have a better idea of how i want to use them
                 //maybe remove additions since options fulfils its purpose but keep removals
            //     key: 'additions',
            //     label: 'Additions',
            //     required: false,
            //     options:[
            //         { key: 'component', value: "component" }
            //     ]
            // },
            // {
            //     key: 'removals',
            //     label: 'Removals',
            //     required: false,
            //     options:[
            //         { key:'component', value: "component" }
            //     ]
            // },
        ]
    };