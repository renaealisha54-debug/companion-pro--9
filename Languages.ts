/**
 * ui.js — Project modal & file management UI
 * Nexus IDE
 */

// Tracks which project is currently open in the editor
window.activeProjectId = null;

// Populate the file list in the modal
function renderFileList() {
    const list = document.getElementById('file-list');
    list.innerHTML = '';
    StorageController.getAllProjects().forEach(project => {
        const li = document.createElement('li');
        li.style.cssText = 'padding:0.4rem 0; cursor:pointer; color:#e2e8f0;';
        li.textContent = project.name;
        li.onclick = () => loadFile(project.id);
        list.appendChild(li);
    });
}

// Load a file into the editor
function loadFile(id) {
    const projects = StorageController.getAllProjects();
    const project = projects.find(p => p.id === id);
    if (!project) return;

    window.activeProjectId = id;
    document.getElementById('editor').value = project.content;
    document.getElementById('file-name-display').innerText = project.name;
    document.getElementById('project-modal').style.display = 'none';
    EditorEngine.updateLines();
    Terminal.log(`Opened: ${project.name}`, 'info');
}

// Create a new file from the modal input
function addNewFile() {
    const nameInput = document.getElementById('new-file-name');
    const name = nameInput.value.trim();
    if (!name) return;

    StorageController.createProject(name);
    nameInput.value = '';
    renderFileList();
    Terminal.log(`Created: ${name}`, 'success');
}

// Re-render list every time the modal opens
document.getElementById('project-modal').addEventListener('transitionend', renderFileList);
document.querySelector('[onclick*="project-modal"]')?.addEventListener('click', renderFileList);

// Seed initial project id on load
window.addEventListener('DOMContentLoaded', () => {
    const projects = StorageController.getAllProjects();
    if (projects.length) {
        window.activeProjectId = projects[0].id;
        document.getElementById('file-name-display').innerText = projects[0].name;
    }
});
