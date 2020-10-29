var TxtType = function (el, toRotate, periodInit, periodEnd, disabled) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.periodInit = parseInt(periodInit, 10) || 2000;
    this.periodEnd = parseInt(periodEnd, 10) || 2000;
    this.txt = '';
    if (!disabled) {
        this.tick();
    }
    else {
        this.fill();
    }
    this.isDeleting = false;
};

TxtType.prototype.tick = function () {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = this.txt;

    var that = this;
    var delta = 200 - Math.random() * 100;

    if (this.isDeleting) { delta /= 2; }

    if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.periodInit;
        this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = this.periodEnd;
    }

    setTimeout(function () {
        that.tick();
    }, delta);
};

TxtType.prototype.fill = function () {
    for (var i = 0; this.toRotate.length > i; i++) {
        this.el.innerHTML += this.toRotate[i];
        if (i < this.toRotate.length - 1) {
            this.el.innerHTML += " - ";
        }
    }
};

window.onload = function () {
    var elements = document.getElementsByClassName('typewrite');
    for (var i = 0; i < elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-type');
        var periodEnd = elements[i].getAttribute('data-period-end');
        var periodInit = elements[i].getAttribute('data-period-init');
        var disabled = elements[i].hasAttribute('data-disabled');
        if (toRotate) {
            new TxtType(elements[i], JSON.parse(toRotate), periodInit, periodEnd, disabled);
        }
    }

    //birthday
    const dateDiffMs = Date.now() - new Date(1985, 9, 3).getTime(); //year, month, day 
    const dateDiff = new Date(dateDiffMs); //year, month, day 

    // years diff

    age.innerHTML = dateDiff.getUTCFullYear() - 1970;
};