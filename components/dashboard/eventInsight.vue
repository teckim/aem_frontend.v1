<template>
  <div v-if="insights">
    <table>
      <tbody v-if="insights.paidEvent">
        <tr>
          <td class="pr-4 text--secondary">
            Ticket price
          </td>
          <td>
            <span class="main--text">
              {{ insights.price }}
            </span>
            <span class="overline">{{ currency }}</span>
          </td>
        </tr>
        <tr>
          <td class="pr-4 text--secondary">
            Total Income
          </td>
          <td>
            <span class="main--text">
              {{ insights.income }}
            </span>
            <span class="overline">{{ currency }}</span>
          </td>
        </tr>
        <tr>
          <td class="pr-4 text--secondary">
            Expected Income
          </td>
          <td>
            <span class="main--text">
              {{ insights.expectedIncome }}
            </span>
            <span class="overline">{{ currency }}</span>
          </td>
        </tr>
        <tr>
          <td class="pr-4 text--secondary">
            Partly paid participants
          </td>
          <td>
            <span class="main--text">
              {{ insights.partlyPaidParts }}
            </span>
          </td>
        </tr>
        <tr>
          <td class="pr-4 text--secondary">
            Paid participants
          </td>
          <td>
            <span class="main--text">
              {{ insights.paidParticipants }}
            </span>
          </td>
        </tr>
      </tbody>
      <tbody>
        <tr>
          <td class="pr-4 text--secondary">
            Checked in participants
          </td>
          <td>
            <span class="main--text">
              {{ insights.checkedInParticipants }} of {{ insights.count }}
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    // income: {
    //   type: Number,
    //   default: 0
    // },
    // expectedIncome: {
    //   type: Number,
    //   default: 0
    // },
    data: {
      type: Object,
      default: null
    }
  },
  computed: {
    currency () {
      return this.$auth.user.office.currency || ''
    },
    insights () {
      if (!this.data.orders || !this.data.event) { return null }
      const insight = {
        paidEvent: !!this.data.event.price,
        price: this.data.event.price,
        income: 0,
        expectedIncome: new Intl.NumberFormat('en-US').format(
          this.data.event.price * this.data.event.ticketsNumber
        ),
        count: this.data.orders.length,
        partlyPaidParts: 0,
        paidParticipants: 0,
        checkedInParticipants: 0
      }
      this.data.orders.forEach((order) => {
        if (!this.data.event.price) {
          if (order.checkedIn) { insight.checkedInParticipants++ }
        } else {
          insight.income += order.paid
          if (order.paid >= this.data.event.price) { insight.paidParticipants++ } else if (order.paid) { insight.partlyPaidParts++ }
        }
      })
      insight.income = new Intl.NumberFormat('en-US').format(insight.income)
      return insight
    }
  }
}
</script>

<style></style>
