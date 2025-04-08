// recruitment_officer.js

function showDeleteSoldierForm() {
    hideAllForms();
    document.getElementById('delete-soldier-form').classList.remove('hidden');
}

function showAllocateEquipmentSoldierForm() {
    hideAllForms();
    document.getElementById('allocate-equipment-soldier-form').classList.remove('hidden');
}

function showAllocateEquipmentSquadForm() {
    hideAllForms();
    document.getElementById('allocate-equipment-squad-form').classList.remove('hidden');
}

function hideAllForms() {
    document.querySelectorAll('.form-container').forEach(form => form.classList.add('hidden'));
}

function fetchAndDeleteSoldier() {
    const soldierId = document.getElementById('soldierId').value;
    // Fetch soldier details and delete logic goes here
    console.log(`Fetching and deleting soldier with ID: ${soldierId}`);
}

function allocateEquipmentToSoldier() {
    const data = {
        equipment_id: document.getElementById('equipmentId').value,
        soldier_id: document.getElementById('soldierIdEquip').value,
        issue_date: document.getElementById('issueDate').value,
        equipment_count: document.getElementById('equipmentCount').value,
    };
    // Allocate equipment logic goes here
    console.log(`Allocating equipment to soldier:`, data);
}

function allocateEquipmentToSquad() {
    const data = {
        equipment_id: document.getElementById('equipmentIdSquad').value,
        squad_id: document.getElementById('squadId').value,
    };
    // Allocate equipment to squad logic goes here
    console.log(`Allocating equipment to squad:`, data);
}
