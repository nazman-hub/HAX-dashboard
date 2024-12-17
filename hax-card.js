/**
 * Copyright 2024 nazman-hub
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";
import '@haxtheweb/simple-icon/simple-icon.js';


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
    this.url =  '';
    this.useCase =  '';
    this.id =  '';
    this.tags =  [];
    this.features =  [];
    this.isHidden = false;
    this.featuresIconMap = new Map([["Accessible", "accessibility"], ["Multi-Language Support", "translate"], ["Downloadable PDF", "file-download"], ["Mobile Compatible", "hardware:phone-iphone"]]);

  }

  static get properties() {
    return {

      name: { type: String },
      title: { type: String },
      description: { type: String },
      url: { type: String },
      id: { type: String },
      useCase: { type: String, attribute: 'use-case' },
      tags: { type: Array },
      features: { type: Array },
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
      /* flex-wrap: wrap; */

      height: 470px;
      padding: var(--ddd-spacing-5, 20px);
      /* border: var(--ddd-border-sm, black solid 3px); */
      border-radius: 12px;
      font-family: var(--ddd-font-primary, roboto);
      font-size:16px;
      color: white;
      background-color: var(--ddd-theme-default-nittanyNavy);
    }

    :host([isHidden]) {
      background-color: black;
      display: none;
    }

    :host([isSelected]) {
      .card-container{
        background-color: var(--ddd-theme-default-coalyGray);
      }
    }

    
    .text-container{  
      font: inherit;
      display: flex;
      flex-direction: column;
      flex: 1 0 0;
      gap: var(--ddd-spacing-3, 20px);
    }


    .title{
      font-size:18px;
      font-weight: var(--ddd-font-weight-bold, bold);
      text-align: center;

      /* margin-bottom:  var(--ddd-spacing-4); */
    }

    .img-container img{
      width: 280px;
      height: 220px;
      object-fit: cover;
    }
 

    a[target="_blank"].text::after {
      content: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAQElEQVR42qXKwQkAIAxDUUdxtO6/RBQkQZvSi8I/pL4BoGw/XPkh4XigPmsUgh0626AjRsgxHTkUThsG2T/sIlzdTsp52kSS1wAAAABJRU5ErkJggg==);
      margin: 0 3px 0 5px;
    }

    .label {
        width: 120px; /* Adjust based on your desired label width */
        font-weight: bold;
    }

    #select-button{
      width: 80px;
      min-height: 40px;
      background-color: white;
      color: black;
      font-weight: bold;
      align-self: flex-end;
      font-size: inherit;
    }
    .bottom-row{
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .description{
      flex: 1 0 30px;

    }
    .tags{
      font-size: 14px;
      color:var(--ddd-theme-default-limestoneGray);
      font-style: italic;

    }
    .tags span{
      font-weight: bold;

    }
    .link a{
      /* color: unset; */
      color: white;
      text-decoration: underline;
      font-weight: bold;
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

  <div class="img-container">
    <img src="${this.getImgSrc()}" alt="${this.getImgSrc()}">

  </div>
  <div class="text-container" >

    <div class="description">${this.description}</div>
    <div class="tags"><span>Tags: </span>${this.getTags()}</div>

    <div class="link"><a  class="link" href="${`https://hax.cloud/?${this.useCase}`}" target="_blank" rel="noopener noreferrer">Demo</a></div>

  </div>
  <div class="bottom-row">

    <div class="icons">
      ${this.features.map((feature)=>html`     
        <simple-icon icon="${this.featuresIconMap.get(feature)}" title="${feature}" dark></simple-icon>
      `)}
      

    </div>   
    
    <button id="select-button" @click="${this._handleClick}">${this.isSelected? html`Selected`: html`Select`}</button>

  </div>
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

  getImgSrc(){
    
    let url = `./lib/img/${this.id}.png`;
    return new URL(url, import.meta.url).href;
  }
  getTags(){
        return this.tags.join(", ");
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
