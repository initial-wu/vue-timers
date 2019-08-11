export default {
    install: Vue => {
        const global = window

        Vue.prototype.$setTimeout = function (...args) {
            let timers = this._timeout_

            // no array on this component instance
            if (timers == null) {
                timers = this._timeout_ = []
            }

            // call window.setTimeout & store timeoutID
            timers.push(global.setTimeout.apply(global, args))
        }

        Vue.prototype.$clearTimeout = function (timeoutID) {
            const timers = this._timeout_

            if (timers == null) return

            // if without timeroutID, clear all timeouts
            if (timeoutID == null) {
                timers.forEach(timeoutID => {
                    this.$clearTimeout(timeoutID)
                });

                this._timeout_ = []

                return
            }

            const index = timers.indexOf(timeoutID)

            // no timeout matches
            if (index === -1) return

            // delete the ID from array & clear the timeout
            global.clearTimeout(timers.splice(index, 1)[0])
        }

        Vue.prototype.$setInterval = function (...args) {
            let timers = this._interval_

            if (timers == null) {
                timers = this._interval_ = []
            }

            timers.push(global.setInterval.apply(global, args))
        }

        Vue.prototype.$clearInterval = function (intervalID) {
            const timers = this._interval_

            if (timers == null) return

            if (intervalID == null) {
                timers.forEach(intervalID => {
                    this.$clearInterval(intervalID)
                });

                this._interval_ = []

                return
            }

            const index = timers.indexOf(intervalID)

            if (index === -1) return

            global.clearInterval(timers.splice(index, 1)[0])
        }

        Vue.mixin({
            beforeDestroy() {
                // clear all timers before the component instance is destroy
                this.$clearTimeout()
                this.$clearInterval()
            }
        })
    }
}