/**
 * Copyright 2024 nazman-hub
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";
import "./hax-card.js";

/**
 * `hax-dashboard`
 * 
 * @demo index.html
 * @element hax-dashboard
 */
export class HaxDashboard extends DDDSuper(I18NMixin(LitElement)) {

  static get tag() {
    return "hax-dashboard";
  }

  constructor() {
    super();
    
    this.data = [];
    this.activeFilters = [];
    this.filteredData = [];
    this.filterIsActive = false;
    this.logoUrl = new URL('./lib/logo.png', import.meta.url).href
    this.dataCount = 0;
    this.selectedCard = [];
    this._handleCardClick = this._handleCardClick.bind(this); // Bind the handler


    this.registerLocalization({
      context: this,
      localesPath:
        new URL("./locales/hax-dashboard.ar.json", import.meta.url).href +
        "/../",
      locales: ["ar", "es", "hi", "zh"],
    });
  }

  // Lit reactive properties
  static get properties() {
    return {
      ...super.properties,
      title: { type: String },  
      activeFilters: { type: Array },  
      data: { type: Array },
      filteredData: { type: Array, reflect: true },
      filterIsActive: { type: Boolean },

    };
  }



  // Lit scoped styles
  static get styles() {
    return [super.styles,
    css`
      :host * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        
      }

      :host {
        display: block;
        color: var(--ddd-theme-primary);
        background-color: var(--ddd-theme-accent);
        font-family: var(--ddd-font-navigation);
      }
      .wrapper {
        display: block;

      }
      /* h3 span {
        font-size: var(--hax-dashboard-label-font-size, var(--ddd-font-size-s));
      } */

      .section{
        /* width: 1300px; */
        margin: auto;
        padding: 0 30px;
        /* background-color: lightblue; */
      }
      .header-background{
        background-color: var(--ddd-theme-default-info);
      }
      .header{
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 50px;
        /* width: 1000px; */
        margin: auto;
        /* padding-top: var(--ddd-spacing-2); */
        
      }
      .logo{
        object-fit: cover;
        width: 70px;
        height: 40px;
        
      }
      ul{
        list-style-type: none;
        display: flex;
        flex-direction: row;
        align-items: flex-end;
        color: white;
        margin: 0;
      }
      .hero{
        height: 100px;
        display: flex;
        justify-content: space-around;
        align-items: center;
        background-color: navajowhite;
      }

      .tag{
        display: flex;
        justify-content: space-between;
        align-items: center;
        /* font-size: 16px; */
        min-height: 40px;
        

      }
      .tag-left{
        display: flex;
        /* gap: var(--ddd-spacing-4); */
      }
      .tag-left p{
        background-color: lightgray;
        padding: 5px 10px;
        border-radius: 20px;
      }

      .cards-search{
        display: flex;

      }

      .search-filter{
        display: flex;
        flex-direction: column;
        min-width: 250px;
        /* border-right: 1px solid #000;  */
        gap: 10px;
        background-color: lightblue;
        padding: 20px;

      }

      .search-input{
        height: 30px;
        max-width: 200px;
      }

      .filter-wrapper{
        /* font-size: 16px; */

      }
      .filter-wrapper h3{
        /* font-size: 20px; */
        /* margin-bottom: 3px; */

      }

      .cards-wrapper{
        display: flex;
        gap: 20px;
        /* margin: auto; */
        flex-wrap: wrap;
        padding-left: 20px;
      }
      hax-card{
        flex: 0 0 0;
      }

      .continue-wrapper{
        display: flex;
        flex-direction: column;
        align-items: flex-end;
      }
      .continue-button{
        
        background-color: black;
        color: white;
        padding: 5px;
        font-size: inherit;

      }
      .continue-button:hover{
        background-color: gray;
        cursor: pointer;
      }
      

    `]; 
  }

  // Lit render the HTML
  render() {
    return html`
<div class="wrapper">
  <div class="header-background">
      <div class="header section">
        <img class="logo" src="${this.logoUrl}" alt="hax logo">

        <ul>
          <li>Merlin</li>
          <li>Search Sites</li>
          <li>acct name</li>
        </ul>
      </div>
    </div>
 
    <div class="hero section" >
      <div class="title">
        <h2>Create a HAX site</h2>
      </div>
      <p class="description">Create anything you want</p>      
    </div>
    <div class="continue-wrapper section">
      <button class="continue-button">Continue</button>
    </div>
    <div class="tag section">
      <div class="tag-left">
          ${this.activeFilters.map((filter)=>html`<p>${filter}</p>`)}
      </div>
      <div class="tag-right">
        ${this.dataCount} results
      </div>
    </div>

    <div class="cards-search section">

      <div class="search-filter">
        <input class="search-input" placeholder="Enter 'haxtheweb.org'" name="search"
          @keyup="${this.updateFilter}"/> 

        <div class="filter-wrapper"> 
          <div class="filter-title"> 
            <h3>Filters</h3>
            <button id="reset-button" @click="${this.resetFilter}">Reset</button>
          </div>
          ${this.data.map((item)=>html`<div><input @click="${this.updateFilter}" type="checkbox" name="filter" value="${item.use_case}"> ${item.title} </div>`)}


       </div>
      </div>  

      <div class="cards-wrapper">
          ${
            this.filteredData.map((item)=>{
            
            return html`
            <hax-card 
              title="${item.title}"
              description="${item.description}"
              name="${item.use_case}"
              ?isSelected="${this.selectedCard[0] === item.use_case}"
            ></hax-card>
            `})
            }
      </div>
    </div>
</div>`;
  }
  firstUpdated(){
    this.fetchData();
    let x = this.shadowRoot.querySelector('hax-card');
    
  }

  filterData(){
    if(this.filterIsActive){
      this.filteredData = [];
      this.data.forEach((item)=>{
        if(item.tags.some(r=> this.activeFilters.includes(r))){ //check if filter includes item tag
          this.filteredData.push(item);
        }
      })
    } else{
      this.filteredData = this.data;
    
    }
    this.dataCount = this.filteredData.length;
    let x = this.shadowRoot.querySelector('hax-card').querySelector('button');
    // console.log(x)


  }
  updated(changedProperties){
    if (changedProperties.has('filteredData')){
      const cards = this.shadowRoot.querySelectorAll('hax-card');
      cards.forEach((card)=>{
        if (card) {
          card.addEventListener('card-click', this._handleCardClick);
        }
      })
    }
  }

  _handleCardClick(event) {
    this.selectedCard = [];
    this.selectedCard.push(event.target.name);
    this.requestUpdate();
    console.log(this.selectedCard);
  }

  resetFilter(){
    this.activeFilters = [];
    this.filterIsActive = false;

    this.filterData();

  }
  


  updateFilter(){
    this.activeFilters = [];

    //update activeFilters from checkbox
    let filters = this.shadowRoot.querySelectorAll('input[name="filter"]');
    filters.forEach(checkbox => {
      if(checkbox.checked){
        this.activeFilters.push(checkbox.value);
      }
    });

    //update activeFilters from search bar
    let searchInput = this.shadowRoot.querySelector('input[name="search"]').value;
    if(searchInput){
      this.activeFilters.push(searchInput.toLowerCase());

    }


    if (this.activeFilters.length === 0){
      this.filterIsActive = false;
    } else{
      this.filterIsActive = true;
    }
    this.filterData();

    // console.log(this.activeFilters)
  }
  
  fetchData(){
    let jsonUrl = new URL('./lib/data.json', import.meta.url).href
    fetch(jsonUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      return response.json();
    })
    .then(data => {
      this.data = [];
      this.data = data.data; 
      this.filteredData = this.data; 
      this.loading = false;
      this.dataCount = this.data.length;

    })
    .catch(error => console.error('Error fetching the JSON:', error));
    }

    /**
     * haxProperties integration via file reference
     */
    static get haxProperties() {
      return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url)
        .href;
    
  }
}


globalThis.customElements.define(HaxDashboard.tag, HaxDashboard);