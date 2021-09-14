module.exports = {
    title : 'LiftLog Frontend',
    description : "Documentation for the frontend of LiftLog.",

    themeConfig : {
        sidebar : {
            '/' : [
                {
                    text: 'Introduction',
                    children : [
                        { text : 'Structure', link : 'introduction/structure'},
                        { text : 'Storage', link : 'introduction/storage'},
                        { text : 'API', link : 'introduction/api'},
                        { text : 'Design', link : 'introduction/design'},
                    ]
                }
            ]
        }
    }
}
