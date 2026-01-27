import {renderUpdateForm, getElements} from "./creation/renderModUpdateForm.js";
import {fetchUpsertSubject, fetchUpsertTeacher} from "../../api/api.js";
import {getNonNegativeInt, normalizeString} from "../../utils/utils.js";

export function createUpdateForm() {
    const wrapper = document.createElement('div');
    wrapper.classList.add('suggestions-list-item');
    wrapper.innerHTML = renderUpdateForm();

    const root = getElements(wrapper);

    bindEvents(wrapper, root);

    return wrapper
}

function bindEvents(wrapper, root) {
    wrapper.addEventListener('input', (e) => {
        if (e.target === root.subject.checkbox) {
            if (root.subject.checkbox.checked) {
                root.subject.id.placeholder = "id"
                root.subject.id.disabled = false;
            } else {
                root.subject.id.value = ""
                root.subject.id.placeholder = "добавить новый"
                root.subject.id.disabled = true;
            }
        }
    })
    let isTeacherSent = false;
    let isSubjectSent = false;
    wrapper.addEventListener('submit', (e) => {
        if (e.target === root.teacher.form) {
            e.preventDefault();
            const data = {
                id: getNonNegativeInt(normalizeString(root.teacher.id.value)),
                title: normalizeString(root.teacher.title.value)
            }

            if (data.id === null) {
                alert("Введите ИСУ преподавателя");
                return;
            }
            if (data.title === '') {
                alert("Введите ФИО преподавателя");
                return;
            }

            if (isTeacherSent) return;
            isTeacherSent = true;
            fetchUpsertTeacher(data).then(data => {
                alert(`Обновлён с id: ${data.id}`);
                e.target.reset();
                isTeacherSent = false;
            }).catch(status => {
                alert(`Сервер ответил ${status}`);
                isTeacherSent = false;
            })
        }
        if (e.target === root.subject.form) {
            e.preventDefault();

            const data = {id: null, title: ''}

            if (root.subject.checkbox.checked) {
                data.id = getNonNegativeInt(normalizeString(root.subject.id.value));
                data.title = normalizeString(root.subject.title.value);

                if (data.id === null) {
                    alert("Введите ID предмета");
                    return;
                }
                if (data.title === '') {
                    alert("Введите название предмета");
                    return;
                }
            } else {
                data.id = null;
                data.title = normalizeString(root.subject.title.value);

                if (data.title === '') {
                    alert("Введите название нового предмета");
                    return;
                }
            }

            if (isSubjectSent) return;
            isSubjectSent = true;
            fetchUpsertSubject(data).then(data => {
                alert(`Обновлён с id: ${data.id}`);
                e.target.reset();
                isSubjectSent = false;
            }).catch(status => {
                alert(`Сервер ответил ${status}`);
                isSubjectSent = false;
            })
        }
    });
}
