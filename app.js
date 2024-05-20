$(document).ready(function() {
    const form = $('#task-form');
    const taskInput = $('#task-input');
    const taskList = $('#task-list');
    const clearTasksBtn = $('#clear-tasks-btn');

    // Cargar tareas desde el servidor
    fetch('http://localhost/todo-list/api.php')
        .then(response => response.json())
        .then(data => {
            data.forEach(taskText => addTask(taskText));
            toggleClearButtonVisibility(data.length > 0);
        });

    form.on('submit', function(event) {
        event.preventDefault();

        const taskText = taskInput.val().trim();
        if (taskText === '') return;

        // Enviar tarea al servidor
        fetch('http://localhost/todo-list/api.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(taskText)
        })
        .then(response => response.json())
        .then(data => {
            addTask(taskText);
            taskInput.val('');
            taskInput.focus();
            toggleClearButtonVisibility(true);
        });
    });

    clearTasksBtn.on('click', function() {
        // Mostrar mensaje de confirmación
        Swal.fire({
            title: '¿Estás seguro?',
            text: '¿Quieres eliminar todas las tareas?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                // Si el usuario confirma, enviar solicitud DELETE al servidor
                fetch('http://localhost/todo-list/api.php', {
                    method: 'DELETE'
                })
                .then(response => response.json())
                .then(data => {
                    taskList.empty();
                    toggleClearButtonVisibility(false);
                    Swal.fire(
                        '¡Todas las tareas eliminadas!',
                        '',
                        'success'
                    );
                });
            }
        });
    });
    

    function addTask(taskText) {
        // Crear el elemento de la tarea
        const taskItem = $('<li>').text(taskText);

        // Crear el botón de eliminar
        const deleteButton = $('<button>').text('Eliminar');
        deleteButton.on('click', function() {
            // Agregar clase de desvanecimiento y eliminar la tarea después de la animación
            taskItem.addClass('fade-out');
            setTimeout(function() {
                taskItem.remove();
            }, 500); // Duración de la animación: 0.5 segundos
        });

        // Agregar el botón de eliminar a la tarea
        taskItem.append(deleteButton);

        // Agregar la tarea a la lista
        taskList.append(taskItem);
    }

    function toggleClearButtonVisibility(visible) {
        clearTasksBtn.toggle(visible);
    }

    $(document).ready(function() {
        const toggleThemeBtn = $('#toggle-theme-btn');
        const body = $('body');
    
        toggleThemeBtn.on('click', function() {
            body.toggleClass('dark-mode');
        });
    });
});



