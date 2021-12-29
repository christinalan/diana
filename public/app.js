var timeline;

timeline = gsap.timeline({
  delay: 0.1,
  paused: true,
});

window.addEventListener("load", () => {
  timeline
    .add(frame1(), 0.1,)    
    .play()
    .add(frame2(), 3)
    .repeat(-1)
    .repeatDelay(3);

    document.getElementById('send').addEventListener('click', () => {
      let tip = document.getElementById('adds').value;
      console.log(tip)

      let obj = {"tip" : tip};
      let jsonData = JSON.stringify(obj);

      //make a fetch request of type POST to sent input to the server
      fetch('/tips', {
        method: 'POST',
        headers: {
          "Content-type": "application/json"
        },
        body: jsonData
      })
      .then(response => response.json())
      .then(data => {
        console.log(data);
      })
    })

    //fetch the logged tips
    document.getElementById('responses').addEventListener("click", () => {
      fetch('gettips')
      .then(resp => resp.json())
      .then(data => {
        document.getElementById('logged_display').innerHTML = '';
        console.log(data.data);
        for (let i = 0; i < data.data.length; i++) {
          let string = data.data[i].tip;
          let element = document.createElement('p');
          element.innerHTML = string;
          document.getElementById('logged_display').appendChild(element);
        }
      })
    })
});


function frame1() {
    return gsap.timeline()

    .addLabel("start")
    .to(boar1, { duration: 6, x: "+=1500", ease: "steps (6)"}, "<")
    .to(boar1, { duration: 0.3, rotation: 5, ease: "slow(0.1, 0.7, false)", yoyo: true, repeat: 10,}, "start" )
    .to(boar2, { duration: 6, x: "+=1600", ease: "steps (6)"}, "<")
    .to(boar2, { duration: 0.3, rotation: -5, ease: "slow(0.1, 0.7, false)", yoyo: true, repeat: 12,}, "start" )
    .to(boar3, { duration: 6, x: "+=1700", ease: "steps (6)"}, "<")
    .to(boar3, { duration: 0.2, rotation: 8, ease: "slow(0.1, 0.7, false)", yoyo: true, repeat: 14,}, "start" )
    // fast boar
    .to(boar4, { duration: 4, x: "+=1800", ease: "steps (6)"}, "<0.8")
    .to(boar4, { duration: 0.1, rotation: 20, ease: "slow(0.1, 0.7, false)", yoyo: true, repeat: 30,}, "start+=0.4" )
    // group boars
    .to(boars1, { opacity: 0.7, duration: 7, x: "-=1300", ease: "steps (6)"}, "start")
    .to(boars1, { duration: 0.7, rotation: 3, ease: "slow(0.1, 0.7, false)", yoyo: true, repeat: 10,}, "<" )
    .to(boars2, { opacity: 0.7, duration: 7, x: "-=1300", ease: "steps (6)"}, "<1.5>")
    .to(boars2, { duration: 0.4, rotation: 5, ease: "slow(0.1, 0.7, false)", yoyo: true, repeat: 10,}, "<" )
}

function frame2() {
    return gsap.timeline()

    .to(martini, {duration: 0.5, rotation: 10, ease: "slow(0.1, 0.7, false)", yoyo: true, repeat: 6}, 0)
    .to(martini, {duration: 1, rotationY: 360}, "<0.3")
}