/**
 * Copyright 2024 nazman-hub
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";

/**
 * `hax-card`
 * 
 * @demo index.html
 * @element hax-card
 */
export class HaxCard extends DDDSuper(I18NMixin(LitElement)) {

  static get tag() {
    return "hax-card";
  }

  constructor() {
    super();
    this.title =  '';
    this.name =  '';
    this.description =  '';
    this.imageSrc =  '';
    this.url =  '';
    this.isHidden = false;


  }

  static get properties() {
    return {

      name: { type: String },
      title: { type: String },
      description: { type: String },
      imageSrc: { type: String },
      url: { type: String },
      isHidden: { type: Boolean, reflect: true },
      isSelected: { type: Boolean, reflect: true },


    };
  }

  // Lit scoped styles
  static get styles() {
    return [super.styles,
    css`

    :host {
      display:block;

    }

    /* contains .title, .image-container, and .text-container */
    .card-container{
      display: flex;
      flex-direction: column;

      gap: var(--ddd-spacing-3, 20px);
      flex-wrap: wrap;

      height: 220px;
      padding: var(--ddd-spacing-5, 20px);
      border: var(--ddd-border-sm, black solid 3px);
      font-family: var(--ddd-font-primary, roboto);
      font-size:16px;
      color: var(--ddd-theme-primary);
      background-color: var(--site-hex-code, --theme-accent);
    }

    :host([isHidden]) {
      background-color: black;
      display: none;
    }

    :host([isSelected]) {
      .card-container{
        background-color: gray;
      }
    }

    
    .text-container{
      font-weight: 400;
      display: flex;
      flex-direction: column;
      gap: var(--ddd-spacing-3,20px);
    }

    .title{
      font-size:18px;
      font-weight: var(--ddd-font-weight-bold, bold);
      text-align: center;

      /* margin-bottom:  var(--ddd-spacing-4); */
    }

    .card-container img {
      display: block;
      width: 250px;
      max-height: 250px;
      object-fit: contain;
      margin: auto;
      
    }
    a div{
      /* text-decoration: none; */
      color:  var(--ddd-theme-primary); 
    }

    a[target="_blank"].text::after {
      content: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAQElEQVR42qXKwQkAIAxDUUdxtO6/RBQkQZvSi8I/pL4BoGw/XPkh4XigPmsUgh0626AjRsgxHTkUThsG2T/sIlzdTsp52kSS1wAAAABJRU5ErkJggg==);
      margin: 0 3px 0 5px;
    }

    .text-row {
        display: flex;
        flex-direction: column;
    }

    .label {
        width: 120px; /* Adjust based on your desired label width */
        font-weight: bold;
    }
    .title a{
      /* text-decoration: none;  */
      color: unset; 
    }


    `];
  }

  // Lit render the HTML
  render() {
    return html`
<div class="card-container" style="--site-hex-code: ${this.hexCode};">

       
  <a  href="${this.pageLink}" target="_blank" rel="noopener noreferrer">  </a>

  <div class="text title">
    ${this.title}
  </div>


  <a href="${this.imageSrc}" target="_blank" rel="noopener noreferrer">
    <img src="${this.imageSrc}" alt="${this.imageSrc}">
  </a>

  <div class="text-container" >

    <div class="text-row">
      <span>${this.description}</span>
    </div>

  </div>

  <button id="select-button" @click="${this._handleClick}">${this.isSelected? html`Selected`: html`Select`}</button>
</div>
    `;
  }
  

  //chatGPT
  _handleClick() {
    const event = new CustomEvent('card-click', {
      detail: { message: 'Button in card clicked!' },
      bubbles: true,   // Makes the event bubble up to the parent
      composed: true,  // Allows the event to pass through shadow DOM boundaries
    });
    this.dispatchEvent(event);  // Dispatch the event
  }


  /**
   * haxProperties integration via file reference
   */
  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url)
      .href;
  }
}

globalThis.customElements.define(HaxCard.tag, HaxCard);
