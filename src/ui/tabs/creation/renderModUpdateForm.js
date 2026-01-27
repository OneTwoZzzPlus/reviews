export function getElements(root) {
    return {
        teacher: {
            id: root.querySelector("#mod-teacher-id"),
            title: root.querySelector("#mod-teacher-title"),
            form: root.querySelector("#mod-teacher-form"),
        },
        subject: {
            id: root.querySelector("#mod-subject-id"),
            title: root.querySelector("#mod-subject-title"),
            checkbox: root.querySelector("#mod-subject-checkbox"),
            form: root.querySelector("#mod-subject-form"),
        }
    };
}

export function renderUpdateForm() {
    return `<details>
        <summary>Добавление преподавателя</summary>
        <form class="mod-form" id="mod-teacher-form">
            <label for="mod-teacher-id">ИСУ</label>
            <input type="text" id="mod-teacher-id" class="mod-row mod-input" placeholder="XXXXXX"/>

            <label for="mod-teacher-title">ФИО</label>
            <input type="text" id="mod-teacher-title" class="mod-row mod-input" placeholder="ФИО"/>

            <button type="submit" id="mod-teacher-submit" class="mod-row rev-button-s">Задать</button>
        </form>
    </details>

    <details>
        <summary>Добавление предмета</summary>
        <form class="mod-form" id="mod-subject-form">
            <div class="mod-form-group">
                <label for="mod-subject-checkbox">новый</label>
                <input type="checkbox" id="mod-subject-checkbox"/>

                <label for="mod-subject-id">ID</label>
                <input type="text" id="mod-subject-id" class="mod-input" placeholder="добавить новый" disabled/>
            </div>

            <label for="mod-subject-title">название</label>
            <input type="text" id="mod-subject-title" class="mod-row mod-input" placeholder="название"/>

            <button type="submit" id="mod-subject-submit" class="mod-row rev-button-s">Задать</button>
        </form>
    </details>`
}