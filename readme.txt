    b-cal, a simple calendar or datepicker


    Homepage: http://github.com/shushik/b-cal/
    Author:   Shushik <silkleopard@yandex.ru>


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

            // Tie up the first calendar to the second and tell that
            // the second calendar has the minimal date in range
            s.tangle(f, '<');
    </code>


    Params for the constructor (if no params are given, calendar should be
    inited by the .init() method before usage)

     NAME     | DESCRIPTION
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

     NAME           | DESCRIPTION
    ======================================================================
     id             | Id for the curren calendar instance. Will appear in
                    | DOM as b-cal_id_{{ your_id }} class
    ----------------------------------------------------------------------
     lang           | Locale vocabulary
    ----------------------------------------------------------------------
     tmpl           | Custom Django-styled templates for header, title for
                    | the next and the previous arrows and template for
                    | output for the tied up field (if exists)
                    |
                    | See the full list of templates below
    ----------------------------------------------------------------------
     mirror         | Secondary (invisible) field node
    ----------------------------------------------------------------------
     min_date       | Minimal date in the calendar`s range (yesterday
                    | by the default)
    ----------------------------------------------------------------------
     now_date       | Current date (today by the default)
    ----------------------------------------------------------------------
     max_date       | Maximal date in the calendar`s range (today + 1
                    | year by the default
    ----------------------------------------------------------------------
     default_stdout | Value which will be inserted into field by default
    ----------------------------------------------------------------------
     block_range    | True if you want to block dates in tied calendar
                    | after the date selection
    ----------------------------------------------------------------------
     no_tail        | True, if you don`t want the calendar`s tail
                    | to be displayed
    ----------------------------------------------------------------------
     offset_ignore  | True, if you want to place calendar block by the
                    | regular CSS rules in your CSS file)
    ======================================================================


    User defined handlers

    Note, that calendar works with these handlers in asynchronous mode
    and every handler has an event.target context while running and event
    object as a first incoming argument. The second argument is an object,
    contains own calendar`s methods with a saved calendar context. Usually
    it`s .done() and .hide(). The only thing you should do is to call
    the calendar`s handler after you finished your actions. «select»
    handler has the third argument with the object, contains chosen date
    (Date()) and parsed (humanized) date object.

    <code>
        var
            cal = new Cal(
                $('form')[0],
                $('input[name="date"]', $('form')[0])[0],
                {},
                {
                    // You defined the handler for select day action
                    select : function(event, fn, data) {
                        $.ajax({
                            url : 'someyoururl',
                            success : function() {
                                // visual selection of the chosen date
                                fn.done();
                                fn.hide();
                            }
                        });
                    }
                }
            );
    </code>


    Available handlers

     NAME     | DESCRIPTION
    ======================================================================
     show     | Runs before the calendar`s showing, so you can make some
              | corrections for the calendar view
    ----------------------------------------------------------------------
     select   | Runs before the chosen date selection, so you can even
              | revert this action
    ----------------------------------------------------------------------
     deselect | Runs before the chosen date deselection
    ======================================================================


    Argumens, available inside the .show() handler

     alias    | description
    ======================================================================
     event    | Standart event object
    ----------------------------------------------------------------------
     handlers | Native calendars functions:
              | — .done()
              | — .hide()
    ======================================================================


    Argumens, available inside the .select() handler

     alias    | description
    ======================================================================
     event    | Standart event object
    ----------------------------------------------------------------------
     handlers | Native calendars functions:
              | — .done()
              | — .hide()
              | — .reset()
              | — .undone()
    ----------------------------------------------------------------------
     data     | Some useful data
              | — raw   — Date() object with the current date
              | — human — An object with the parsed and localized Date()
              | — field — Form field where the current calendar instance
              |           is tied up
    ======================================================================


    Argumens, available inside the .deselect() handler

     alias    | description
    ======================================================================
     event    | Standart event object
    ----------------------------------------------------------------------
     handlers | Native calendars functions:
              | — .done()
              | — .hide()
              | — .reset()
    ======================================================================


    Calendar`s own methods

    Cal. object has two kinds of methods: instance methods and
    pseudostatic methods.

    The first type contains calendar`s managing methods like .show(),
    .hide(), .next() or .prev(). You may need them, if you`ll decide
    to make your own calendar`s behavior logic: without a form field,
    for example.

    The second type contains auxiliary helpers like .inside() which
    determines if a given date is inside the given dates range. To use
    these methods you do not need to create the a calendar`s instance.


    Instance methods

     NAME         | DESCRIPTION
    ======================================================================
     .init()      | Create a new calendar instance.
                  |
                  | Arguments:
                  | — node, where the calendar DOM will be created
                  | — field node (if exists) or null
                  | — params
                  | — handlers
    ----------------------------------------------------------------------
     .tangle()    | Tie up two calendars together.
                  |
                  | Arguments:
                  | — second calendar instance
                  | — relationship indicator («<» or «>»)
    ----------------------------------------------------------------------
     .uninstall() | Remove a calendar instance
    ----------------------------------------------------------------------
     .min()       | Get or set minimal date in calendar`s range, returns
                  | the current value of this property if no argument
                  | is given
                  |
                  | Argumengs:
                  | — Date() which should be set as minimal
    ----------------------------------------------------------------------
     .now()       | Get or set current date in calendar`s range, returns
                  | the current value of this property if no argument
                  | is given
                  |
                  | Argumengs:
                  | — Date() which should be set as current
    ----------------------------------------------------------------------
     .max()       | Get or set maximal date in calendar`s range, returns
                  | the current value of this property if no argument
                  | is given
                  |
                  | Argumengs:
                  | — Date() which should be set as maximal
    ----------------------------------------------------------------------
     .reset()     | Reset changed min, now and max property values
                  | to default or taked from the min_date, now_date and
                  | max_date params
    ----------------------------------------------------------------------
     .show()      | Show the calendar
                  |
                  | Arguments
                  | — Object with a user defined top and left offsets
    ----------------------------------------------------------------------
     .hide()      | Hide the calendar
    ----------------------------------------------------------------------
     .prev()      | Go to previous month
    ----------------------------------------------------------------------
     .next()      | Go to next month
    ----------------------------------------------------------------------
     .jump()      | Jump to a custom date in calendar range. Actually
                  | this function runs every time, user change the
                  | calendar field value
                  |
                  | Arguments:
                  | — string or Date() with the date you want to jump
    ----------------------------------------------------------------------
     .select()    | Select the currently chosen date
    ----------------------------------------------------------------------
     .deselect()  | Deselect selected date
    ======================================================================


    Pseudostatic methods

     NAME        | DESCRIPTION
    ======================================================================
     .order()    | Take an array of Date objects and sort it ascending
                 | way. Return sorted array or the minimal or maximal
                 | value from it
                 |
                 | Arguments:
                 | — array of dates
                 | — 'min' or 'max' string
    ----------------------------------------------------------------------
     .parse()    | Take a string and parse it into Date object
                 |
                 | Arguments:
                 | — string contains date
    ----------------------------------------------------------------------
     .human()    | Get an object with humanized and localized Date values
                 | or a template parsed string if the second argument
                 | is given
                 |
                 | Arguments:
                 | — Date object
                 | — Template string
    ----------------------------------------------------------------------
     .count()    | Make all counts for the currently shown month
                 |
                 | Arguments:
                 | — Date (currently shown)
    ----------------------------------------------------------------------
     .inside()   | Check if a date is in a dates range
                 |
                 | Arguments:
                 | — Date which will be checked
                 | — Date minimal in range
                 | — Date maximal in range
    ----------------------------------------------------------------------
     .weekend()  | Check if a date is a weekend
                 |
                 | Arguments:
                 | — year
                 | — month
                 | — day
    ----------------------------------------------------------------------
     .holiday()  | Check if a date is a holiday
                 |
                 | Arguments:
                 | — year
                 | — month
                 | — day
    ----------------------------------------------------------------------
     .lang()     | Load a vocabulary
                 |
                 | Arguments:
                 | — vocabulary object (see detailed description below)
    ----------------------------------------------------------------------
     .holidays() | Load a holidays list
                 |
                 | Arguments:
                 | — an array with the dates in yyyy-mm-dd format. Note
                 |   that dates should be given for the full range
                 |   between the minimal and maximal calendar dates
    ======================================================================


    Vocabulary structure

     NAME     | DESCRIPTION
    ======================================================================
     hide     | A string with a text for the «Hide» calendar element
    ----------------------------------------------------------------------
     prev     | A string with a text for the «Previous» arrow
    ----------------------------------------------------------------------
     next     | A string with a text for the «next» arrow
    ----------------------------------------------------------------------
     weekdays | Object, contains two arrays with short and full weekdays
              |
              | Structure:
              | — part
              | — full
    ----------------------------------------------------------------------
     monthes  | Object, contains three arrays with short, full and
              | declentioned monthes
              |
              | Structure:
              | — part
              | — full
              | — decl
    ======================================================================


    Available templates

     NAME   | DESCRIPTION                   | DEFAULT VALUE
    =============================================================================
     hat    | Calendar title                | '{{ month.full }} {{ year.full }}'
    -----------------------------------------------------------------------------
     prev   | Title of the «previous» arrow | '{{ month.full }} {{ year.full }}'
    -----------------------------------------------------------------------------
     next   | Title of the «next» arrow     | '{{ month.full }} {{ year.full }}'
    -----------------------------------------------------------------------------
     stdout | String which will be inserted | '{{ day.num }} {{ month.part }}'
            | into field                    |
    =============================================================================


    Available variables in templates

     NAME  | DESCRIPTION
    ======================================================================
     day   | An object with a chosen day data
           |
           | Structure:
           | — num  _ day number without a leading zero
           | — nums — day number with a leading zero
           | — week — number of a weekday (sunday is 7)
           | — part — shortened weekday name from a loaded vocabulary
           | — full — full weekday name from a loaded vocabulary
    ----------------------------------------------------------------------
     year  | An object with a chosen year data
           |
           | Structure:
           | — leap — true in case of leap year
           | — days — number of days in year
           | — part — two digits year number
           | — full — four digits year number
    ----------------------------------------------------------------------
     month | An object with a chosen month data
           |
           | Structure:
           | — num  _ month number without a leading zero
           | — nums — month number with a leading zero
           | — days — number of days in month
           | — part — shortened month name from a loaded vocabulary
           | — full — full month name from a loaded vocabulary
           | — decl — declentioned month name from a loaded vocabulary
    ======================================================================
