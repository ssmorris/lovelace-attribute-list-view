class AttributeListView extends HTMLElement {
  set hass(hass) {
    if (!this.content) {
      const card = document.createElement('ha-card');
      card.header = this.config.header;
      this.content = document.createElement('div');
      this.content.style.padding = '0 16px 16px';
      card.appendChild(this.content);
      this.appendChild(card);
    }

    const entityId = this.config.entity;
	const attributeId = this.config.attribute;
    const attributeValue = hass.states[entityId].attributes[attributeId];
	const attributeString = attributeValue.map(entry => `<li>${entry}</li>`).join('');

    this.content.innerHTML = `
      <ul>${attributeString}</ul>
    `;
  }

  setConfig(config) {
    if (!config.entity) {
      throw new Error('You need to define an entity');
    }
	if (!config.attribute) {
      throw new Error('You need to define an attribute');
    }
    this.config = config;
  }

  // The height of your card. Home Assistant uses this to automatically
  // distribute all cards over the available columns.
  getCardSize() {
    return 3;
  }
}

customElements.define('attribute-list-view', AttributeListView);