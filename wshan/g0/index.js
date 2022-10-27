const devTeam = ["우석", "혜린", "진석", "관석", "영재"]

new Vue({
  el: "#app",
  data: {
    devTeam,
  },
  components: {
    field: {
      props: ["member"],
      template: `
      <div class="wrap">
        <div class="frog-wrap">
          <img
            src="https://flexboxfroggy.com/images/frog-green.svg"
            class="frog"
          />
          <p>{{member}} 개굴</p>
        </div>
        <div class="lotus-wrap">
          <img v-for="i in 9" src="https://flexboxfroggy.com/images/lilypad-green.svg" class="lotus-leaf"/>
        </div>
    </div>
      `,
      data: function () {
        return {
          devTeam,
        }
      },
    },
  },
})

$(".frog-wrap").click(async function () {
  let left = 0
  const random = Math.floor(Math.random() * 9 + 1)

  const delay = (n) => {
    return new Promise((resolve) => {
      setTimeout(resolve, n * 1000)
    })
  }

  for (let i = 0; i < random; i++) {
    left = left + 166

    $(this).attr("style", `left:${left}px`)
    await delay(0.5)

    if (i === 8) {
      $(this).attr("style", `left:${left}px; transform: scale(0.3);`)
    }
  }
})
