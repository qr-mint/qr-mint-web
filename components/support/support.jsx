import React from 'react';
import './style.scss';
import { ReactComponent as Icon1 } from '../../assets/images/support/cogs-6.svg';
import { ReactComponent as Icon2 } from '../../assets/images/support/megaphone.svg';
import { ReactComponent as Icon3 } from '../../assets/images/support/trophy.svg';
import { ReactComponent as Icon4 } from '../../assets/images/support/wallet.svg';
const Support = () => {
	return (
		<div className="support">
			<div className="container">
				<div className="support__inner">
					<h2 className="support__title">
						Поддержка на каждой стадии разработки
					</h2>
					<div className="support__items">
						<div className="support__item">
							<span className="support__item-logo">
								<Icon1 />
							</span>
							<div className="support__item-info">
								<p className="support__item-title">Техническая поддержка</p>
								<p className="support__item-text">
									Участники COSMO GAME созваниваются каждую неделю и могут
									помочь с трудностями при интеграции, техническими и
									бизнес-вопросами.
								</p>
							</div>
						</div>
						<div className="support__item">
							<span className="support__item-logo">
								<Icon2 />
							</span>
							<div className="support__item-info">
								<p className="support__item-title">Маркетинговая поддержка</p>
								<p className="support__item-text">
									COSMO GAME поможет обеспечить охват в social media, когда ваша
									игра будет готова к запуску.
								</p>
							</div>
						</div>
						<div className="support__item">
							<span className="support__item-logo">
								<Icon3 />
							</span>
							<div className="support__item-info">
								<p className="support__item-title">Гранты и нетворкинг</p>
								<p className="support__item-text">
									После первых результатов запуска участники COSMO GAME смогут
									помочь в масштабировании игры с помощью грантов на Telegram
									Ads, публикаций и нетворкинга.
								</p>
							</div>
						</div>
						<div className="support__item">
							<span className="support__item-logo">
								<Icon4 />
							</span>
							<div className="support__item-info">
								<p className="support__item-title">Инвестиции и контакты</p>
								<p className="support__item-text">
									Если ваша игра уже имеет значительную аудиторию, участники
									COSMO GAME могут проинвестировать в неё или познакомить вас с
									венчурными фондами.
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Support;
