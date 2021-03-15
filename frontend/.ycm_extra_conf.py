def Settings(**kwargs):
    return {
        "ls": {
            "vetur": {
                "validation": {
                    "template": True,
                    "style": True,
                    "script": True
                },
                "completion": {
                    "autoImport": False,
                    "useScaffoldSnippets": False
                },
                "format": {
                    "defaultFormatter": {
                        "js": "prettier",
                        "ts": "prettier"
                    },
                    "defaultFormatterOptions": {},
                    "scriptInitialIndent": False,
                    "styleInitialIndent": False,
                    "options" : {
                        "tabSize": 4
                    }
                }
            },
            "css": {},
            "html": {
                "suggest": {}
            },
            "javascript": {
                "format": {}
            },
            "typescript": {
                "format": {}
            },
            "emmet": {},
            "stylusSupremacy": {}
        }
    }
