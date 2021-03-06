/**
`d2l-user-card` is a Litelement-based web component for creating a user card.
@demo demo/index.html
*/
import '@polymer/polymer/polymer-legacy.js';

import '@brightspace-ui/core/components/colors/colors';
import '@brightspace-ui/core/components/icons/icon-custom';
import '@brightspace-ui/core/components/typography/typography';
import { bodyCompactStyles } from '@brightspace-ui/core/components/typography/styles.js';
import 'd2l-image/d2l-image.js';
import 'd2l-card/d2l-card.js';
import 'd2l-card/d2l-card-loading-shimmer.js';
import { LitElement, css, html } from 'lit-element';
import { ifDefined } from 'lit-html/directives/if-defined';

export class UserTile extends LitElement {
	static get styles() {
		return [bodyCompactStyles, css`
			:host {
				width: 350px;
				height: 350px;
				text-align: center;
				cursor: pointer;
				display: block;
				position: relative;
				animation: fade-in 0.33s forwards;
			}

			:host([hidden]) {
				display: none;
			}

			.user-tile-avatar {
				width: 80px;
				height: 80px;
				margin: auto;
				border: 2px white solid;
				border-radius: 14px;
				background-color: white;
				overflow: hidden;
				display: inline-block;
				z-index: 1;
			}

			.user-tile-background,
			d2l-card-loading-shimmer {
				width: 100%;
				height: 100px;
				z-index: -1;
			}

			svg {
				z-index: 1;
				background: white;
			}

			.user-tile-items {
				padding-left: 20px;
				padding-right: 20px;
				text-align: left;
			}

			.user-tile-default-icon {
				--d2l-icon-height: 100%;
				--d2l-icon-width: 100%;
				--d2l-icon-fill-color: var(--d2l-color-sylvite);
			}

			.user-tile-information-wrapper {
				display: flex;
				flex-direction: column;
			}

			.user-tile-name {
				font-size: 1.25rem;
				font-weight: bold;
				margin: 0 auto;
				padding-bottom: 10px;
			}

			.user-tile-background {
				background-color: var(--d2l-color-sylvite);
			}

			.text-placeholder {
				background-color: var(--d2l-color-sylvite);
				width: 150px;
				border-radius: 6px;
			}

			d2l-card {
				--d2l-image-tile-image-height: 100px;
				min-height: 100%;
				width: 100%;
				margin: 0;
			}

			d2l-card[loading] {
				border: 1px var(--d2l-color-gypsum) solid;
			}

			@keyframes fade-out-then-in {
				0% { opacity: 1; }
				50% { opacity: 0; }
				100% { opacity: 1; }
			}

			@keyframes fade-in {
				0% { opacity: 0; }
				100% { opacity: 1; }
			}

			:host([prev-placeholders]:not([placeholders])) {
				animation: fade-out-then-in 0.33s forwards;
			}

			[hidden] {
				display: none;
			}
		`];
	}

	static get properties() {
		return {
			background: {
				type: String
			},
			backgroundColor: {
				type: String,
				attribute: 'background-color'
			},
			icon: {
				type: String
			},
			name: {
				type: String
			},
			text: {
				type: String
			},
			token: {
				type: String
			},
			placeholders: {
				type: Boolean,
				reflect: true
			},
			_placeholders: {
				type: Boolean
			},
			href: {
				type: String,
				attribute: 'href'
			},
		};
	}

	render() {
		return html`
			<d2l-card text="${ifDefined(this._getA11YTitleString())}" ?loading="${this._placeholders}" href="${this.href || 'javascript:void(0);'}">
				<d2l-card-loading-shimmer ?loading="${this._placeholders}" slot="header">
					<div class="user-tile-background" style="${ifDefined(this._getBackgroundStyle())}"></div>
				</d2l-card-loading-shimmer>
				<div slot="badge" class="user-tile-avatar" aria-hidden="true">
				${this._showIconPlaceholder() ? html`
						<d2l-icon-custom class="user-tile-default-icon">
							<svg width="48" height="48" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
								<path d="M0 8.007C0 3.585 3.588 0 8.007 0h31.986C44.415 0 48 3.588 48 8.007v31.986C48 44.415 44.412 48 39.993 48H8.007C3.585 48 0 44.412 0 39.993V8.007zm2 0v31.986C2 43.31 4.69 46 8.007 46h31.986C43.31 46 46 43.31 46 39.993V8.007C46 4.69 43.31 2 39.993 2H8.007C4.69 2 2 4.69 2 8.007zM38.27 31.74c.47.7.72 1.55.73 2.39V38c0 .56-.45 1-1 1-.56 0-1-.44-1-1 0 0 0-2.89-.06-3.99l-.04-.54c-.07-.22-.17-.43-.3-.63-.04-.06-.08-.12-.14-.17-.06-.1-.15-.19-.24-.25-.09-.1-.18-.17-.28-.23-.1-.07-.2-.13-.31-.18-.11-.06-.23-.11-.35-.15l-.07-.02c-.04-.01-.09-.02-.13-.04-1.06-.27-2.12-.5-3.13-.68C29.79 32.92 27.02 34 24 34c-3.02 0-5.79-1.08-7.95-2.88-1.01.18-2.07.41-3.13.68-.04.02-.09.03-.13.04l-.04.01-.03.01-.04.02c-.11.04-.21.08-.31.13-.11.05-.21.11-.31.18-.1.06-.19.13-.28.23-.09.06-.18.15-.24.25-.06.05-.1.11-.14.17-.13.2-.23.41-.3.63l-.04.54C11 35.11 11 38 11 38c0 .56-.44 1-1 1-.55 0-1-.44-1-1v-3.87c.01-.84.26-1.69.73-2.39.54-.83 1.37-1.44 2.31-1.76.11-.04.23-.07.35-.1 1.15-.3 2.3-.55 3.47-.76.73-.14 1.47-.26 2.21-.36.37-.05 1.94-.18 1.95-.25.19-1.15-.23-2.31-.79-3.32-.58-1.01-1.32-1.92-1.87-2.95-1.23-2.26-1.5-5.01-.74-7.45.15-.47.34-.93.57-1.37.06-.11.12-.23.19-.34.3-.51.65-1 1.05-1.44.17-.19.35-.37.53-.54.28-.26.57-.49.87-.72h.01c.31-.22.64-.42.97-.59.72-.36 1.5-.62 2.31-.73.13-.02.26-.04.4-.04.14-.02.29-.02.43-.02h.1c.14 0 .29 0 .43.02.14 0 .27.02.4.04.81.11 1.59.37 2.31.73.33.17.66.37.97.59h.01c.3.23.59.46.87.72.19.17.37.35.53.54.4.44.75.93 1.05 1.44.07.11.13.23.19.34.23.44.42.9.57 1.37.76 2.44.49 5.19-.74 7.45-.55 1.03-1.29 1.94-1.87 2.95-.56 1.01-.98 2.17-.79 3.32.01.07 1.58.2 1.95.25.74.1 1.48.22 2.21.36 1.17.21 2.32.46 3.47.76.12.03.24.06.35.1.94.32 1.77.93 2.31 1.76zM24 33c2.47 0 4.75-.78 6.62-2.11v-.01c-.34-.04-.66-.1-.97-.14-.05 0-.13-.01-.22-.02s-.21-.02-.32-.03c-1.55-.17-2.89-.31-3.11-1.89-.22-1.43.12-2.97 1.03-4.59.31-.55.64-1.04.96-1.52.33-.48.64-.94.89-1.41.97-1.77 1.19-3.97.59-5.89-.13-.43-.31-.84-.53-1.22-.07-.12-.14-.23-.21-.35-.11-.17-.24-.34-.37-.51-.09-.12-.19-.24-.29-.35-.89-1.01-2.09-1.77-3.47-1.92-.06-.01-.13-.02-.2-.02-.08-.01-.15-.02-.23-.02h-.34c-.08 0-.15.01-.23.02-.07 0-.13 0-.2.02-1.38.15-2.58.91-3.47 1.92-.1.11-.2.23-.29.35-.13.16-.26.34-.37.51-.07.12-.14.23-.21.35-.22.4-.4.81-.53 1.22-.6 1.92-.38 4.12.6 5.91.24.45.55.91.88 1.39.32.48.65.97.96 1.52.91 1.62 1.25 3.16 1.03 4.59-.22 1.58-1.56 1.72-3.11 1.89-.11.01-.23.02-.32.03-.09.01-.17.02-.22.02-.31.04-.63.1-.97.14v.01C19.25 32.22 21.53 33 24 33z"></path>
							</svg>
						</d2l-icon-custom>
					` : html`
						<d2l-image @d2l-image-failed-to-load="${this._onImageLoadFailure}" image-url="${ifDefined(this.icon)}" token="${ifDefined(this.token)}" alternate-text=""></d2l-image>
					`}
				</div>
				<div class="d2l-body-compact user-tile-information-wrapper" slot="content">
					<h3 class="user-tile-name" ?hidden="${this._showNamePlaceholder()}">${this.name}</h3>
					<p class="user-tile-name text-placeholder" ?hidden="${!this._showNamePlaceholder()}"></p>
					<div class="user-tile-items">
						<slot></slot>
					</div>
				</div>
				<slot name="footer" slot="footer"></slot>
			</d2l-card>
		`;
	}

	updated(changedProperties) {
		if (changedProperties.has('placeholders')) {
			if (this.placeholders) {
				this.setAttribute('prev-placeholders', true);
			}
			setTimeout(() => {
				this._placeholders = this.placeholders;
			}, 160);
		}
	}

	_showIconPlaceholder() {
		return this._placeholders || !this.icon;
	}

	_showNamePlaceholder() {
		return this._placeholders || (typeof this.name !== 'string');
	}

	_onImageLoadFailure() {
		this.icon = null;
	}

	_getA11YTitleString() {
		return `${this.text || this.name}`;
	}

	_getBackgroundStyle() {
		if (this.background) {
			return `background: url(${this.background}); background-size: cover; background-position: center;`;
		}
		if (this.backgroundColor) {
			return `background-color: ${this.backgroundColor};`;
		}
		return undefined;
	}
}

customElements.define('d2l-user-card', UserTile);
