/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * */
 class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor(element) {
    super(element);
    this.renderAccountsList();
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    const select = this.element.querySelector('select[name="account_id"]');
    if (!select) return;
    Account.list({}, (response) => {
      if (response && response.success) {
        select.innerHTML = '';
        response.data.forEach(account => {
          const option = document.createElement('option');
          option.value = account.id;
          option.textContent = account.name;
          select.appendChild(option);
        });
      } else {
        console.error('Failed to load accounts for select:', response);
      }
    });
  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit(data) {
    Transaction.create(data, (error, response) => {
      if (!error && response && response.success) {
        App.update();
        this.element.reset();
        const modal = this.element.closest('.modal');
        if (modal) {
          const modalId = modal.getAttribute('data-modal-id');
          App.getModal(modalId).close();
        }
      }
    });
  }
}