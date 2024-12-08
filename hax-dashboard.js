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
    
    this.searchResults = [];
    this.activeFilters = [];
    this.filterIsActive = false;

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
      searchResults: { type: Array },
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
      /* .wrapper {
        margin: var(--ddd-spacing-2);
        padding: var(--ddd-spacing-4);
      } */
      /* h3 span {
        font-size: var(--hax-dashboard-label-font-size, var(--ddd-font-size-s));
      } */

      .section{
        max-width: 1300px;
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
        /* background-color: navajowhite; */
      }

      .tag{
        display: flex;
        justify-content: space-between;
        padding-top: 15px;
        padding-bottom: 15px;
        font-size: 16px;

      }
      .tag-left{
        display: flex;
        gap: var(--ddd-spacing-4);
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
        width: 250px;
        border-right: 1px solid #000; 
        gap: 10px;

      }

      .search-input{
        height: 30px;
        max-width: 200px;
      }

      .filter-wrapper{
        font-size: 16px;

      }
      .filter-wrapper h3{
        font-size: 20px;
        margin-bottom: 3px;

      }

      .cards-wrapper{
        display: flex;
        gap: 20px;
        /* margin: auto; */
        flex-wrap: wrap;
      }
      hax-card{
        flex: 0 0 0;
      }
      

    `]; 
  }

  // Lit render the HTML
  render() {
    return html`
<div class="wrapper">
  <div class="header-background">
      <div class="header section">
        <img class="logo" src="lib/logo.png">

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
      <p class="description">Choose the type of site you want to create</p>      
    </div>

    <div class="tag section">
      <div class="tag-left">
          ${this.activeFilters.map((filter)=>html`<p>${filter}</p>`)}
      </div>
      <div class="tag-right">
        ${this.searchResults.length} results
      </div>
    </div>

    <div class="cards-search section">

      <div class="search-filter">
        <input class="search-input" placeholder="Enter 'haxtheweb.org'"
          @keydown="${(e)=>{if(e.key==='Enter'){this.search();}}}"/> 

        <div class="filter-wrapper"> 
          <h3>Filters</h3>
          <div><input @click="${this.updateFilter}" type="checkbox" name="filter" value="blog"> Blog </div>
          <div><input @click="${this.updateFilter}" type="checkbox" name="filter" value="collection"> Collection</div>
          <div><input @click="${this.updateFilter}" type="checkbox" name="filter" value="course"> Course</div>
          <div><input @click="${this.updateFilter}" type="checkbox" name="filter" value="website"> Website</div>
          <div><input @click="${this.updateFilter}" type="checkbox" name="filter" value="research"> Research Website</div>
          <div><input @click="${this.updateFilter}" type="checkbox" name="filter" value="portfolio"> Portfolio </div>
          <div><input @click="${this.updateFilter}" type="checkbox" name="filter" value="resume"> Resume</div>

       </div>
      </div>

      <div class="cards-wrapper">
          ${this.searchResults?
            this.searchResults.map((item)=>html`
            <hax-card 
              title="${item.title}"
              description="${item.description}"
              ?isHidden="${
                this.filterIsActive?
                !item.tags.some(r=> this.activeFilters.includes(r))
                :false
                }"
            ></hax-card>
            `):
            html``
            }
      </div>
    </div>
</div>`;
  }
  firstUpdated(){
    this.fetchData();

  }
  updated(changedProperties){
    // console.log(changedProperties)
    if (changedProperties.has('activeFilters')){
      // console.log(1);
    }
  }
  search(){
    this.searchQuery = this.shadowRoot.querySelector('.search-input').value;
  }

  updateFilter(){
    this.activeFilters = [];

    let filters = this.shadowRoot.querySelectorAll('input[name="filter"]');
    filters.forEach(checkbox => {
      if(checkbox.checked){
        this.activeFilters.push(checkbox.value);
      }
      
    });

    if (this.activeFilters.length === 0){
      this.filterIsActive = false;
    } else{
      this.filterIsActive = true;
    }

    // console.log(this.activeFilters)
  }
  
  fetchData(){
    fetch('lib/data.json')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      return response.json();
    })
    .then(data => {
      this.searchResults = [];
      this.searchResults = data.data; 
      this.loading = false;
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