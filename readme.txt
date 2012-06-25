    b-cal, a simple calendar like datepicker


    Goods:

    — simple usage;
    — compatible with any framework;
    — two calendars binding;
    — templates for output, header and arrows texts;
    — local holidays loader;
    — local vocabulary loader (default language is English);
    — can be used without binded field;
    — a bunch of methods for a custom behavior usage;
    — a bunch of useful static methods.


    Requirements:

    — Javascript;
    — HTML5, HTML4 or XHTML doctype for proper rendering in IE.


    Code example:

    <code>
        // Create a single calendar
        var
            c = new Cal(
                document.body,
                document.forms['Form'].fields['DateField'], // $('input['DateField']')[0] if you use jQuery
                {
                    // If use English, you can skip «lang» property
                    lang : {
                        hide : 'Text for «hide» element',
                        weekdays : {
                            part : ['Mo', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
                            full : ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье']
                        },
                        monthes : {
                            full  : [
                                'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
                                'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
                            ],
                            decl : [
                                'Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня',
                                'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'
                            ],
                            part : [
                                'Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн',
                                'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'
                            ]
                        }
                    }
                },
                {
                    select : function(event, fn, data) {
                        /*
                            Your code here
                        */

                        fn.done();
                        fn.hide();
                    }
                }
            );
    </code>

    <code>
        // Tie up two calendars together
        var
            l = {
                // If use English, you can skip «lang» property
                lang : {
                    hide : 'Text for «hide» element',
                    weekdays : {
                        part : ['Mo', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
                        full : ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье']
                    },
                    monthes : {
                        full  : [
                            'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
                            'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
                        ],
                        decl : [
                            'Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня',
                            'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'
                        ],
                        part : [
                            'Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн',
                            'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'
                        ]
                    }
                }
            },
            // Create first calendar instance
            f = new Cal(
                document.body,
                document.forms['Form'].fields['DateField'], // $('input['DateField']')[0] if you use jQuery
                l,
                {
                    select : function(event, fn, data) {
                        /*
                            Your code here
                        */

                        fn.done();
                        fn.hide();
                    }
                }
            ),
            // Create second calendar instance
            s = new Cal(
                document.body,
                document.forms['Form'].fields['DateField'], // $('input['DateField']')[0] if you use jQuery
                l,
                {
                    select : function(event, fn, data) {
                        /*
                            Your code here
                        */

                        fn.done();
                        fn.hide();
                    }
                }
            );

            // Tie up the first calendar to the second and tell that the second calendar
            // has the maximal date in range
            f.tangle(s, '>');

            // Tie up the first calendar to the second and tell that the second calendar
            // has the minimal date in range
            s.tangle(f, '<');
    </code>


    Params for the constructor (if no params are given, calendar should be
    inited by the .init() method before usage)

     alias    | description
    ======================================================================
     target   | DOM node, where calendar will be created (document.body
              | by default
    ----------------------------------------------------------------------
     field    | Field, which will be tied up to a calendar instance
              | (null if you want your custom logic for calendar)
    ----------------------------------------------------------------------
     params   | Hash with the user defined settings
    ----------------------------------------------------------------------
     handlers | Hash with the user defined handlers
    ======================================================================


    User defined settings

     alias         | description
    ======================================================================
     id            | Id for the curren calendar instance. Will appear in DOM
                   | as b-cal_id_{{ your_id }} class
    ----------------------------------------------------------------------
     lang          | Locale vocabulary
    ----------------------------------------------------------------------
     tmpl          | Custom Django-styled templates for header, title for
                   | the next and the previous arrows and template for
                   | output for the tied up field (if exists)
    ----------------------------------------------------------------------
     min_date      | Minimal date in the calendar`s range (yesterday
                   | by the default)
    ----------------------------------------------------------------------
     now_date      | Current date (today by the default)
    ----------------------------------------------------------------------
     max_date      | Maximal date in the calendar`s range (today + 1 year
                   | by the default
    ----------------------------------------------------------------------
     no_tail       | True, if you don`t want the calendar`s tail
                   | to be displayed
    ----------------------------------------------------------------------
     offset_ignore | True, if you want to place calendar block by the
                   | regular CSS rules in your CSS file)
    ======================================================================


    User defined handlers

     alias | description
    ======================================================================
    ----------------------------------------------------------------------
    ======================================================================