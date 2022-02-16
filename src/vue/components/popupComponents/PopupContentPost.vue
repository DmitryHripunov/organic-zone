<template>
   <div>
    <div class="popup__group">
      <p class="popup__desc">
          Если нужный вам товар появится на складе, мы оповестим вас по электронной почте.
      </p>
    </div>

    <div class="popup__group">
      <!-- для незарегистрированных пользоватетей -->
      <!-- <form class="form">
        <div class="form__group">
          <input type="email" class="form__input" placeholder="Электронная почта">
        </div>

        <div class="form__group">
          <button type="submit" class="btn btn_primary btn_fill">Сообщите мне</button>
        </div>
      </form> -->

      <!-- для зарегистрированных -->
      <form class="form">
        <div class="form__group">
          <div class="popup__desc"> Мы сообщим вам на:
            <div>
              <strong>design.onlinebees@gmail.com</strong>
            </div>
          </div>  

          <a href="#" class="popup__action popup__action_start">Изменить</a>
        </div>

        <div class="form__group">
          <button type="submit" class="btn btn_primary btn_fill">Получить повторно</button>
        </div>
      </form>
    </div>
  </div> 
</template>

<script>
export default {
 
}
</script>