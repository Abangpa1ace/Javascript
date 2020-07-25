var Body = {
    setColor : function(c) {
        document.querySelector('body').style.color = c;
    },
    setBgColor : function(c) {
        document.querySelector('body').style.backgroundColor = c;
    }
}
function night_day(self) {
    var target = document.querySelector('body');
    if(self.value === 'night') {
        Body.setBgColor('black');
        Body.setColor('white');
        self.value = 'day';
        }
    else {
        Body.setBgColor('white');
        Body.setColor('black');
        self.value = 'night';
    }
}