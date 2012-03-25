;(function(space) {


    var
        /**
         * @author      Shushik <silkleopard@yandex.ru>
         * @version     1.0 (dev)
         * @description b-cal — a simple JavaScript/CSS calendar
         *
         * @constructor
         *
         * @this   {Cal}
         * @param  {Object}
         * @param  {Object}
         * @param  {DOMNode}
         * @param  {Object}
         * @return {Cal}
         */
        Cal = function(dates, lang, target, handlers) {
            /**
             * Language settings
             *
             * @private
             */
            this._lang = {
                week : [
                    'Mo',
                    'Tu',
                    'We',
                    'Th',
                    'Fr',
                    'Sa',
                    'Su'
                ],
                month : [
                    'January',
                    'February',
                    'March',
                    'April',
                    'May',
                    'June',
                    'July',
                    'August',
                    'September',
                    'October',
                    'November',
                    'December'
                ],
                hide : 'hide'
            };

            /**
             * Dates matrix
             *
             * @private
             */
            this._data = {
                prev : null,
                curr : null,
                next : null
            };

            /**
             * Stable dates origin
             *
             * @private
             */
            this._stable = {
                min : null,
                max : null,
                now : null
            };

            /**
             * Movable dates origin
             *
             * @private
             */
            this._moving = {
                min : null,
                max : null,
                now : null
            };

            /**
             * Necessary DOM nodes
             *
             * @private
             */
            this._nodes = {
                cal    : null,
                days   : null,
                prev   : null,
                next   : null,
                tail   : null,
                month  : null,
                target : null
            };

            /**
             * User defined handlers
             *
             * @private
             */
            this._handlers = {
                click : function() {}
            };

            this.init(dates, lang, target, handlers);

            return this;
        };

        Cal.prototype = {
            /**
             * @this   {Cal}
             * @param  {Object}
             * @param  {Object}
             * @param  {DOMNode}
             * @param  {Object}
             * @return {Cal}
             */
            init : function(dates, lang, target, handlers) {
                lang     = lang     || false;
                dates    = dates    || {};
                target   = target   || document.body;
                handlers = handlers || {};

                var
                    alias = '';

                // DOM node where the calendar lives
                this._nodes.target = target;

                // Set user defined
                if (lang) {
                    for (alias in this._lang) {
                        this._lang[alias] = lang[alias];
                    }
                }

                // Set user defined handlers
                for (alias in handlers) {
                    this._handlers[alias] = handlers[alias];
                }

                // Create a new calendar
                this.preset(dates)._create();

                return this;
            },
            /**
             * Check the date between maximum and minimum
             *
             * @private
             *
             * @this   {Cal}
             * @param  {Date}
             * @param  {Date}
             * @param  {Date}
             * @return {Boolean}
             */
            _inside : function(day, min, max) {
                if (day > min && day < max) {
                    return true
                }

                return false;
            },
            /**
             * A kind of calendar math
             *
             * @private
             *
             * @this   {Cal}
             * @return {Cal}
             */
            _count : function() {
                var
                    all   = 42,
                    tmp   = 0,
                    curr  = null,
                    prev  = null,
                    next  = null;

                // Clean the previous and next dates
                this._data.prev = null;
                this._data.next = null;

                // Set current date for a chosen month
                curr = this._data.curr = {}
                curr.raw   = new Date(this._moving.now);
                curr.month = curr.raw.getMonth();
                curr.year  = curr.raw.getFullYear();
                curr.till  = new Date(curr.year, curr.month + 1, 0).getDate();
                curr.from  = 1;
                curr.beg   = new Date(curr.year, curr.month, 1).getDay();
                curr.end   = new Date(curr.year, curr.month, curr.till).getDate();

                if (curr.beg == 0) {
                    curr.beg = 7;
                }

                all -= curr.till;

                // Set previous date for a chosen month
                prev = this._data.prev = {};
                prev.raw   = new Date(curr.year, curr.month - 1);
                prev.month = prev.raw.getMonth();
                prev.year  = prev.raw.getFullYear();
                prev.till  = new Date(prev.year, curr.month, 0).getDate();
                prev.from  = prev.till - (curr.beg - 2);

                all -= curr.beg;

                // Set next date for a chosen month
                next = this._data.next = {};
                next.raw   = new Date(curr.year, curr.month + 1);
                next.month = next.raw.getMonth();
                next.year  = next.raw.getFullYear();
                next.till  = all + 1;
                next.from  = 1;

                return this;
            },
            /**
             * Create main DOM structure
             *
             * @private
             *
             * @this   {Cal}
             * @return {Cal}
             */
            _create : function() {
                var
                    pos   = 0,
                    alias = '',
                    cal   = null,
                    tin   = null,
                    self  = this,
                    tout  = null,
                    hide  = null,
                    node  = null;

                // Background of calendar`s tail
                tin = document.createElement('div');
                tin.className = 'b-cal__tail-in';

                // Border of calendar`s tail
                tout = document.createElement('div');
                tout.className = 'b-cal__tail-out';

                // «Hide» link
                hide = document.createElement('div');
                hide.className = 'b-cal__hide';
                hide.innerHTML = this._lang.hide;

                // Parent calendar`s node
                cal = this._nodes.cal = document.createElement('div');
                cal.className = 'b-cal';

                // «Previous» arrow
                this._nodes.prev = document.createElement('div');
                this._nodes.prev.className = 'b-cal__prev';

                // «Next» arrow
                this._nodes.next = document.createElement('div');
                this._nodes.next.className =  'b-cal__next';

                // Month`s name holder
                this._nodes.month = document.createElement('div');
                this._nodes.month.className = 'b-cal__month';

                // Month days holder
                this._nodes.days = document.createElement('div');
                this._nodes.days.className = 'b-cal__days';

                // Weekdays holder
                this._nodes.week = document.createElement('div');
                this._nodes.week.className = 'b-cal__weekdays';

                // Weekdays
                for (pos = 0; pos < 7; pos++) {
                    node = document.createElement('li');
                    node.className = 'b-cal__weekday';
                    node.innerHTML = this._lang.week[pos];

                    this._nodes.week.appendChild(node);
                }

                // Append all created stuff
                cal.appendChild(tout);
                cal.appendChild(tin);
                cal.appendChild(this._nodes.month);
                cal.appendChild(this._nodes.prev);
                cal.appendChild(this._nodes.next);
                cal.appendChild(this._nodes.week);
                cal.appendChild(this._nodes.days);
                cal.appendChild(hide);
                this._nodes.target.appendChild(cal);

                // Set events handlers
                for (alias in this._handlers) {
                    if (cal.addEventListener) {
                        cal.addEventListener(
                            alias,
                            function(event) {
                                self._live(alias, event);
                            }
                        );
                    } else if (cal.attachEvent) {
                        cal.attachEvent(
                            'on' + alias,
                            function() {
                                self._live(alias, window.event);
                            }
                        );
                    }
                }

                return this;
            },
            /**
             * Create a DOM for chosen month
             *
             * @private
             *
             * @this   {Cal}
             * @param  {Boolean|Object}
             * @return {Cal}
             */
            _draw : function(dates) {
                dates = dates || false;

                // Set dates for current month
                this.set(dates);

                var
                    check   = false,
                    checked = false,
                    day     = 0,
                    chosen  = 0,
                    present = 0,
                    lang    = this._lang,
                    data    = this._data,
                    prev    = data.prev,
                    curr    = data.curr,
                    next    = data.next,
                    moving  = this._moving,
                    stable  = this._stable,
                    min     = moving.min,
                    now     = moving.now,
                    max     = moving.max,
                    nodes   = this._nodes,
                    year    = curr.year,
                    month   = curr.month;

                // Set month name
                nodes.days.innerHTML  = '';
                nodes.month.innerHTML = lang.month[curr.month] +
                                        ' ' +
                                        curr.year;

                // Get the current day
                if (
                    stable.now.getFullYear() == year &&
                    stable.now.getMonth() == month
                ) {
                    present = stable.now.getDate();
                }

                // Get the chosen day
                if (
                    moving.chosen &&
                    moving.chosen.month == month &&
                    moving.chosen.year == year
                ) {
                    chosen = moving.chosen.day;
                }

                // Create DOM for days in previous month
                if (curr.beg > 1) {
                    for (day = prev.from; day <= prev.till; day++) {
                        node = document.createElement('div');
                        node.innerHTML = day;

                        if (this._inside(new Date(prev.year, prev.month, day), min, max)) {
                            checked = true;

                            node.className = 'b-cal__day b-cal__day_in_past';
                        } else {
                            node.className = 'b-cal__day b-cal__day_is_disabled';
                        }

                        nodes.days.appendChild(node);
                    }
                } else if (this._inside(new Date(prev.year, prev.month, prev.from), min, max)) {
                    checked = true;
                }

                if (checked) {
                    nodes.prev.title     = lang.month[prev.month] +
                                           ' ' +
                                           prev.year;
                    nodes.prev.className = 'b-cal__prev';

                    checked = false;
                } else {
                    nodes.prev.title     = '';
                    nodes.prev.className = 'b-cal__prev b-cal__prev_is_disabled';
                }

                // Create DOM for days in present month
                for (day = curr.from; day <= curr.till; day++) {
                    node  = document.createElement('div');
                    check = this._inside(new Date(year, month, day), min, max);

                    node.innerHTML = day;

                    if (chosen == day) {
                        node.className = 'b-cal__day b-cal__day_is_chosen';
                    } else if (present == day) {
                        node.className = 'b-cal__day b-cal__day_in_presence';
                    } else if (check) {
                        node.className = 'b-cal__day';
                    } else {
                        node.className = 'b-cal__day b-cal__day_is_disabled';
                    }

                    nodes.days.appendChild(node);
                }

                // Create DOM for days in next month
                if (next.till > 0) {
                    for (day = next.from; day <= next.till; day++) {
                        node = document.createElement('div');
                        node.innerHTML = day;

                        if (this._inside(new Date(next.year, next.month, day), min, max)) {
                            checked = true;

                            node.className = 'b-cal__day b-cal__day_in_future';
                        } else {
                            node.className = 'b-cal__day b-cal__day_is_disabled';
                        }

                        nodes.days.appendChild(node);
                    }
                }

                if (checked) {
                    nodes.next.title     = lang.month[next.month] +
                                           ' ' +
                                           next.year;
                    nodes.next.className = 'b-cal__next';
                } else {
                    nodes.next.title     = '';
                    nodes.next.className = 'b-cal__next b-cal__next_is_disabled';
                }
            },
            /**
             * Root handler for all events
             *
             * @private
             *
             * @this   {Cal}
             * @param  {String}
             * @param  {Event}
             * @return {Cal}
             */
            _live : function(alias, event) {
                if (event.srcElement) {
                    event.target = event.srcElement;
                }

                if (event.target.nodeType == 3) {
                    event.target = event.target.parentNode;
                }

                var
                    curr  = this._data.curr,
                    node  = event.target,
                    cname = node.className,
                    day   = node.innerHTML;

                if (cname) {
                    switch (cname) {

                        // Go to previous month
                        case 'b-cal__prev':
                        case 'b-cal__day b-cal__day_in_past':
                            this.prev();
                        break;

                        // Go to next month
                        case 'b-cal__next':
                        case 'b-cal__day b-cal__day_in_future':
                            this.next();
                        break;

                        // Hide calendar
                        case 'b-cal__hide':
                            this.set().hide();
                        break;

                        // Choose day
                        case 'b-cal__day':
                        case 'b-cal__day b-cal__day_in_presence':
                            // Call user defined click handler
                            this._handlers.click(
                                                  event.target,
                                                  event,
                                                  new Date(
                                                            curr.year,
                                                            curr.month,
                                                            day
                                                          )
                                                );

                            // Set the chosen day
                            this._moving.chosen = {
                                                    year  : curr.year,
                                                    month : curr.month,
                                                    day   : day
                                                  };

                            // Draw a calendar with new settings
                            this._draw({
                                now : new Date(curr.year, curr.month, day)
                            });
                        break;

                    }
                }
            },
            /**
             * Set the stable calendar settings
             *
             * @this   {Cal}
             * @param  {Object}
             * @return {Cal}
             */
            preset : function(dates) {
                dates = dates || {};

                var
                    tmp  = [],
                    tmpl = {
                             now : new Date(),
                             min : null,
                             max : null
                           };

                // Default minimal date
                tmpl.min = new Date(
                                     tmpl.now.getFullYear(),
                                     tmpl.now.getMonth(),
                                     tmpl.now.getDate() - 1
                                   );

                // Default maximal date
                tmpl.max = new Date(
                                     tmpl.now.getFullYear() + 1,
                                     tmpl.now.getMonth(),
                                     tmpl.now.getDate()
                                   );

                // Save values
                for (alias in this._stable) {
                    if (dates[alias]) {
                        tmp = dates[alias].split(' ');

                        this._stable[alias] = new Date(tmp[0], tmp[1] - 1, tmp[2]);
                    } else {
                        this._stable[alias] = tmpl[alias];
                    }
                }

                return this;
            },
            /**
             * An alias for Cal.set() method without params
             *
             * @this   {Cal}
             * @return {Cal}
             */
            reset : function() {
                return this.set();
            },
            /**
             * Set the moving calendar settings
             *
             * @this   {Cal}
             * @param  {Object}
             * @return {Cal}
             */
            set : function(dates) {
                var
                    moving = this._moving,
                    stable = this._stable,
                    from   = dates || {};

                // Clear chosen
                if (!dates && moving.chosen) {
                    delete moving.chosen;
                }

                // Save values
                for (alias in moving) {
                    if (from[alias]) {
                        moving[alias] = from[alias];
                    } else if (!dates) {
                        moving[alias] = stable[alias];
                    }
                }

                // Count new values for calendar
                this._count();

                return this;
            },
            /**
             * Show calendar
             *
             * @this   {Cal}
             * @param  {Boolean|String}
             * @param  {Boolean|Object}
             * @return {Cal}
             */
            show : function(dates, move) {
                dates = dates || false;
                move  = move  || false;

                this._draw(dates);

                this._nodes.cal.className = 'b-cal b-cal_is_visible';

                if (move) {
                    this._nodes.cal.style.top  = move.y + 'px';
                    this._nodes.cal.style.left = move.x + 'px';
                }

                return this;
            },
            /**
             * Hide calendar
             *
             * @this   {Cal}
             * @return {Cal}
             */
            hide : function() {
                this._nodes.cal.className = 'b-cal';

                return this;
            },
            /**
             * Go to the previous month
             *
             * @this   {Cal}
             * @return {Cal}
             */
            prev : function() {
                var
                    prev = this._data.prev;

                if (prev) {
                    this
                    .show({now : new Date(prev.year, prev.month, 1)});
                }

                return this;
            },
            /**
             * Go to the next month
             *
             * @this   {Cal}
             * @return {Cal}
             */
            next : function() {
                var
                    next = this._data.next;

                if (next) {
                    this
                    .show({now : new Date(next.year, next.month, 1)});
                }

                return this;
            },
            /**
             * Return minimal date
             *
             * @this   {Cal}
             * @return {Date}
             */
            min : function() {
                return this._stable.min;
            },
            /**
             * Return maximal date
             *
             * @this   {Cal}
             * @return {Date}
             */
            max : function() {
                return this._stable.max;
            }
        };


    // Go to global scope
    if (space) {
        cpase.Cal = Cal;
    } else {
        window.Cal = Cal;
    }


})();