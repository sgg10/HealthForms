<template>
  <div>
    <section class="formAuth my-5">
      <section class="formAuth-Container">
        <slot/>
      </section>
    </section>
  </div>
</template>

<script>
export default {
  name: 'FormAuthLayout'
}
</script>

<style lang="scss">
  .formAuth{
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 0px 30px;

    .formAuth-Container{
      background: rgba($color: #ffffff, $alpha: 0.6);
      border: 2px solid #707070;
      border-radius: 40px;
      color: #707070;
      padding: 60px 68px 40px;
      min-height: 700px;
      width: 500px;
      display: flex;
      margin-top: 20px;
      justify-content: space-around;
      flex-direction: column;
      @media only screen and (max-width: 700px), only screen and (max-device-width: 700px){
        width: 100%;
      }

      .input{
        border-radius: 40px;
      }

      .button{
        height: 50px;
        border-radius: 30px;
        border: none;
        margin: 20px 0px;
        font-size: 16px;
        font-weight: bold;
        color: white;
        letter-spacing: 1px;
        width: 300px;
        background: #5966E8;
        @media only screen and (max-width: 700px), only screen and (max-device-width: 700px){
          width: 100%;
        }
      }
      .button:hover{
        background: #3140e2;
      }
    }
  }
</style>
