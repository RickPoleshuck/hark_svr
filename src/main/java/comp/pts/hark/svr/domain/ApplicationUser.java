package comp.pts.hark.svr.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A ApplicationUser.
 */
@Entity
@Table(name = "application_user")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class ApplicationUser implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "last_access")
    private Instant lastAccess;

    @Size(max = 15)
    @Column(name = "ip_address", length = 15)
    private String ipAddress;

    @OneToMany(mappedBy = "user")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "user" }, allowSetters = true)
    private Set<Site> sites = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ApplicationUser id(Long id) {
        this.id = id;
        return this;
    }

    public Instant getLastAccess() {
        return this.lastAccess;
    }

    public ApplicationUser lastAccess(Instant lastAccess) {
        this.lastAccess = lastAccess;
        return this;
    }

    public void setLastAccess(Instant lastAccess) {
        this.lastAccess = lastAccess;
    }

    public String getIpAddress() {
        return this.ipAddress;
    }

    public ApplicationUser ipAddress(String ipAddress) {
        this.ipAddress = ipAddress;
        return this;
    }

    public void setIpAddress(String ipAddress) {
        this.ipAddress = ipAddress;
    }

    public Set<Site> getSites() {
        return this.sites;
    }

    public ApplicationUser sites(Set<Site> sites) {
        this.setSites(sites);
        return this;
    }

    public ApplicationUser addSite(Site site) {
        this.sites.add(site);
        site.setUser(this);
        return this;
    }

    public ApplicationUser removeSite(Site site) {
        this.sites.remove(site);
        site.setUser(null);
        return this;
    }

    public void setSites(Set<Site> sites) {
        if (this.sites != null) {
            this.sites.forEach(i -> i.setUser(null));
        }
        if (sites != null) {
            sites.forEach(i -> i.setUser(this));
        }
        this.sites = sites;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ApplicationUser)) {
            return false;
        }
        return id != null && id.equals(((ApplicationUser) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ApplicationUser{" +
            "id=" + getId() +
            ", lastAccess='" + getLastAccess() + "'" +
            ", ipAddress='" + getIpAddress() + "'" +
            "}";
    }
}
