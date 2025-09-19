/**
 * Класс CreateAccountForm управляет формой
 * создания нового счёта
 * */
 class CreateAccountForm extends AsyncForm {
  /**
   * Создаёт счёт с помощью Account.create и закрывает
   * окно в случае успеха, а также вызывает App.update()
   * и сбрасывает форму
   * */
  onSubmit(data) {
    Account.create(data, (error, response) => {
      if (!error && response && response.success) {
        const modal = this.element.closest('.modal');
        if (modal) {
          const modalId = modal.getAttribute('data-modal-id');
          const modalName = modalId === 'newAccount' ? 'createAccount' : modalId;
          const modalInstance = App.getModal(modalName);
          if (modalInstance) {
            modalInstance.close();
          }
        }
        App.update();
        this.element.reset();
      } else {
        console.error('Account creation failed:', error || 'Unknown error', response);
      }
    });
  }
}